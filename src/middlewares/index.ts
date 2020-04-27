import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import { Application } from 'express';
import passport from './passport';
import session from './session';

class Middlewares {
  public init(app: Application) {
    app.use(bodyParser.json());
    app.use('*', cors());
    app.use(compression());
    session(app);
    passport(app);
  }
}

export const middlewares = new Middlewares();
