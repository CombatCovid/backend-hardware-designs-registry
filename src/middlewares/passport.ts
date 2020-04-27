import { Application } from 'express';
import * as passport from 'passport';
import { Strategy } from 'passport-github2';
import { User } from '../components/user/user.model';

export default (app: Application) => {
  app.use(passport.initialize());

  passport.use(
    new Strategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        callbackURL: process.env.GITHUB_CALLBACK_URL as string
      },
      async (_: any, __: any, profile: any, cb: any) => {
        const { id } = profile;
        const existingUser = await User.findOne({ githubId: id });

        // If user exist then return a callback
        if (existingUser) {
          return cb(null, { id });
        }

        // If user not found then create new one and return a callback
        const newUser = await User.create({
          githubId: id,
          username: profile.username,
          email: profile.email,
          id: profile.id,
          avatar: profile.avatar_url
        });

        return cb(null, { id: newUser.id });
      }
    )
  );
};
