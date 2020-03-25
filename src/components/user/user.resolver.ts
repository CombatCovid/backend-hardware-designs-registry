import { UserModel } from './models';

export const userResolvers = {
  Mutation: {
    signUp: async (_, { username, email, password }) => {
      const user = await UserModel.getUser({ username });
      if (user) {
        throw new Error('User already exists');
      }

      const newUser = await UserModel.addUser({
        username,
        email,
        password
      });
      return newUser;
    }
  }
};
