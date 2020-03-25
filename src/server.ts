import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import { config } from 'dotenv';
import { createServer } from 'http';
import { resolve } from 'path';

export const BASE_PATH: string = __dirname;
config({ path: resolve(__dirname + '/../.env') });

import { GraphQLSchema } from 'graphql';
import app from './app';
import { connection } from './utils/dbConnection';

import { logger } from 'js-logging-tool';
import mongoose from 'mongoose';

import { postTypeDef } from './components/post/schemas';
import { userTypeDef } from './components/user/schemas';

import { postResolvers } from './components/post';
import { userResolvers } from './components/user';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [postTypeDef, userTypeDef],
  resolvers: [postResolvers, userResolvers]
});

const server = new ApolloServer({
  schema
});

server.applyMiddleware({ app });

const httpServer = createServer(app);

const port: string | number = process.env.PORT || 8080;

/**
 * Connecting to database
 * And starting server
 */
connection
  .then(() => {
    logger.info(__filename, ``, ``, ``, `DB connected successfully.`);
    httpServer.listen(port, () => {
      logger.info(__filename, ``, ``, ``, `Server is running at http://localhost:8080${server.graphqlPath}`);
    });
  })
  .catch((err) => {
    logger.error(__filename, ``, ``, ``, `Unable to connect to the database ${err}`);
  });

/**
 * Exit handler
 */
function exitHandler() {
  logger.info(__filename, '', '', `Closing http server.`, '');
  httpServer.close(() => {
    logger.info(__filename, 'Server', '', `Http server closed.`, '');
    mongoose.connection.close().then(() => {
      logger.info(__filename, 'Server', '', `DB shut down gracefully`, '');
      process.exit(0);
    });
  });
}

process.on('unhandledRejection', (reason: string, p: Promise<any>) => {
  throw reason;
});

/**
 * Exit Events
 */
[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
  (process as NodeJS.EventEmitter).on(eventType, exitHandler.bind(null, eventType));
});
