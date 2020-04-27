import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import { Application } from 'express';

class Middlewares {
  public init(app: Application) {
    app.use(bodyParser.json());
    app.use('*', cors());
    app.use(compression());
  }
}

export const middlewares = new Middlewares();
