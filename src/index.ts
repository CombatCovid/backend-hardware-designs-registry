require('dotenv').config();
import { config } from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';
import { resolve } from 'path';
import { genSchema } from './utils/genSchema';

export const BASE_PATH: string = __dirname;
config({ path: resolve(__dirname + '/../.env') });

import { connection } from './utils/dbConnection';
import { Server } from 'http';

export default (async (): Promise<Server> => {
  const server = new GraphQLServer({
    schema: genSchema()
  });

  // Graphql-Yoga comes with express so you can do anything you wish with express;
  const express = server.express;

  express.disable('x-powered-by');

  const cors = {
    origin: '*'
  };
  const port: string | number = process.env.PORT || 8080;

  try {
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
  } catch (e) {
    throw new Error(e);
  }
})();
