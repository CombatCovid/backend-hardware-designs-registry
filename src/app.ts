import express from 'express';
import { middlewares } from './middlewares/index';
import { routes } from './routes/index';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    // this.mountRoutes();
  }

  private middlewares(): void {
    middlewares.init(this.app);
  }

  private mountRoutes(): void {
    // Health Check
    this.app.get('/health', (req: express.Request, res: express.Response) => {
      res.status(200).json({ success: true });
    });

    // routes.init(this.app);

    // Invalid Route
    this.app.all('/*', (req: express.Request, res: express.Response) => {
      res.status(400).json({ status: 400, message: 'Bad Request' });
    });
  }
}

export default new App().app;
