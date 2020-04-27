import * as connectRedis from 'connect-redis';
import { Application } from 'express';
import * as session from 'express-session';
import { REDIS_SESSION_PREFIX } from '../utils/constants';
import { redis } from '../utils/redis';

const RedisStore = connectRedis(session);

export default (app: Application): void => {
  app.use(
    session({
      store: new RedisStore({
        client: redis,
        prefix: REDIS_SESSION_PREFIX
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
};
