import * as bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';

class Middlewares {
  public init(app: express.Application) {
    app.use(bodyParser.json());
    app.use('*', cors());
    app.use(compression());
  }
}

export const middlewares = new Middlewares();
