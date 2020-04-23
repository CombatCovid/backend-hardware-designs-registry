import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import { GraphQLServer } from 'graphql-yoga';
import { Server } from 'http';

import { genSchema } from './utils/genSchema';
import { connection } from './utils/dbConnection';
import { redis } from './utils/redis';
import { redisSessionPrefix } from './utils/constants';

const RedisStore = connectRedis(session);

export const startServer = async (): Promise<Server> => {
  const schema = genSchema() as any;
  const server = new GraphQLServer({
    schema,
    context: ({ request }): any => ({
      redis,
      // @ts-ignore
      session: request.session,
      req: request
    })
  });

  server.express.use(
    session({
      store: new RedisStore({
        client: redis,
        prefix: redisSessionPrefix
      }),
      name: 'combatCovid',
      secret: 'what is your secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      }
    })
  );

  server.express.disable('x-powered-by');

  const cors = {
    origin: '*'
  };

  const port: string | number = process.env.PORT || 8080;

  await connection
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((e) => {
      throw new Error(e);
    });

  const app = await server.start({
    cors,
    port
  });

  console.log(`Server started on http://localhost:${port}`);
  return app;
};
