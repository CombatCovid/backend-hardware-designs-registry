import * as express from 'express';
import * as passport from 'passport';
import { middlewares } from './middlewares/index';

export class App {
  constructor(app: express.Application) {
    this.middlewares(app);
    this.mountRoutes(app);
  }

  private middlewares(app: express.Application): void {
    middlewares.init(app);
  }

  private mountRoutes(app: express.Application): void {
    // Health Check
    app.get('/health', (_: express.Request, res: express.Response) => {
      res.status(200).json({ success: true });
    });

    // Github auth routes
    app.get('/auth/github', passport.authenticate('github'));

    app.get('/auth/github/callback', passport.authenticate('github', { session: false }), (_, res) => {
      res.redirect('/');
    });

    // routes.init(app);

    // Invalid Route
    app.all('/*', (_: express.Request, res: express.Response) => {
      res.status(400).json({ status: 400, message: 'Bad Request' });
    });
  }
}
