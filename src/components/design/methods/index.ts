import { Design } from '../../../models/design';

export default {
  getDesigns: async (): Promise<any> => {
    try {
      const designs = await Design.find()
        .sort({ createdDate: 'desc' })
        .populate({
          path: 'createdBy',
          model: 'User'
        });

      return designs;
    } catch (error) {
      throw new Error(error);
    }
  },
  addDesign: async (obj: any): Promise<any> => {
    try {
      const newDesign = await new Design(obj).save();
      return newDesign;
    } catch (error) {
      throw new Error(error);
    }
  }
};
