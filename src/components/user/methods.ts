import { User } from './user.model';

export default {
  getUser: async (condition: object): Promise<any> => {
    try {
      return await User.findOne(condition);
    } catch (e) {
      throw new Error(e);
    }
  },

  addUser: async (obj: GQL.ISignUpOnMutationArguments): Promise<any> => {
    try {
      const newUser = await new User(obj).save();
      return newUser;
    } catch (e) {
      throw new Error(e);
    }
  }
};
