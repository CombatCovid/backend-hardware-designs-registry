import UserModel from './methods';
import { ResolverMap } from '../../types';

export const resolvers: ResolverMap = {
  Mutation: {
    signUp: async (_, { username, ...args }: GQL.ISignUpOnMutationArguments, context): Promise<any> => {
      context.session.userId = 'Hello world';
      console.log(context.req.session);
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
