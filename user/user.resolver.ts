import { UserModel } from './models';

export const userResolvers = {
  Mutation: {
    signUp: async (_: any, { username, ...args }): Promise<any> => {
      const user = await UserModel.getUser({ username });
      if (user) {
        throw new Error('User already exists');
      }

      const newUser = await UserModel.addUser({
        username,
        ...args
      });
      return newUser;
    }
  }
};
