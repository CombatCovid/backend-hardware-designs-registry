import { Design } from '../schemas';

class DesignModel {
  public async getDesigns() {
    try {
      const designs = await Design.find({})
        .sort({ createdDate: 'desc' })
        .populate({
          path: 'createdBy',
          model: 'User'
        });

      return designs;
    } catch (error) {
      throw error;
    }
  }

  public async addDesign(obj) {
    try {
      const newDesign = await new Design(obj).save();
      return newDesign;
    } catch (error) {
      throw error;
    }
  }
}

export default new DesignModel();
