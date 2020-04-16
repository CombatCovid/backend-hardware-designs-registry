import UserModel from './methods';
import { ResolverMap } from '../../types';

export const resolvers: ResolverMap = {
  Mutation: {
    signUp: async (_, { username, ...args }: GQL.ISignUpOnMutationArguments): Promise<any> => {
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
