import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import * as passport from 'passport';
import { Strategy } from 'passport-github2';

import { GraphQLServer } from 'graphql-yoga';
import { Server } from 'http';

import { genSchema } from './utils/genSchema';
import { connection } from './utils/dbConnection';
import { redis } from './utils/redis';
import { redisSessionPrefix } from './utils/constants';
import { User } from './components/user/user.model';

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

  const { express } = server;

  express.use(
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

  express.disable('x-powered-by');

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

  passport.use(
    new Strategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        callbackURL: 'http://localhost:8080/github/auth/callback'
      },
      async (_: any, __: any, profile: any, cb: any) => {
        const { id } = profile;
        const existingUser = await User.findOne({ githubId: id });
        if (existingUser) {
          console.log(existingUser);
          return cb(null, { id });
        }
        const newUser = await User.create({
          githubId: id,
          username: profile.username,
          email: profile.email,
          id: profile.id,
          avatar: profile.avatar_url
        });

        console.log({ profile });
        console.log({ newUser });
        return cb(null, { id: newUser.id });
      }
    )
  );

  express.use(passport.initialize());

  express.get('/github/auth', passport.authenticate('github'));

  express.get('/github/auth/callback', passport.authenticate('github', { session: false }), (_, res) => {
    res.redirect('/');
  });

  const app = await server.start({
    cors,
    port
  });

  console.log(`Server started on http://localhost:${port}`);
  return app;
};
