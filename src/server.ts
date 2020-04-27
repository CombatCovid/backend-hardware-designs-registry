require('dotenv').config();
import { App } from './app';
import { GraphQLServer } from 'graphql-yoga';
import { genSchema } from './utils/genSchema';
import { connection } from './utils/dbConnection';
import { redis } from './utils/redis';

const schema = genSchema() as any;

const server = new GraphQLServer({
  schema,
  context: ({ request }): any => ({
    redis,
    session: request.session,
    req: request
  })
});

new App(server.express);

const port: string | number = process.env.PORT || 8080;

connection
  .then(() => {
    console.log('Connected to MongoDB');
    server.start({ port }, () => {
      console.log(`Server started on http://localhost:${port}`);
    });
  })
  .catch((e) => {
    throw new Error(e);
  });
