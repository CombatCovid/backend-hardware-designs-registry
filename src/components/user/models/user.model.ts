import { User } from '../schemas';

class UserModel {
  public async getUser(condition: object) {
    try {
      return await User.findOne(condition);
    } catch (error) {
      throw error;
    }
  }

  public async addUser(obj) {
    try {
      const newUser = await new User(obj).save();
      return newUser;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserModel();
