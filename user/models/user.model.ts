import { User } from '../schemas';

class UserModel {
  public async getUser(condition: object): Promise<any> {
    try {
      return await User.findOne(condition);
    } catch (e) {
      throw new Error(e);
    }
  }

  public async addUser(obj: any): Promise<any> {
    try {
      const newUser = await new User(obj).save();
      return newUser;
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default new UserModel();
