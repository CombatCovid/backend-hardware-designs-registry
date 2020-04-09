import DesignModel from './methods';
import { ResolverMap } from '../../types';

export const resolvers: ResolverMap = {
  Query: {
    getDesigns: async (): Promise<any> => {
      const designs = await DesignModel.getDesigns();
      return designs;
    }
  },

  Mutation: {
    addDesign: async (_, args: GQL.IAddDesignOnMutationArguments): Promise<any> => {
      const newDesign = await DesignModel.addDesign(args);
      return newDesign;
    }
  }
};
