import { DesignModel } from './models';

export const designResolver = {
  Query: {
    getDesigns: async (_, args) => {
      const designs = await DesignModel.getDesigns();
      return designs;
    }
  },

  Mutation: {
    addDesign: async (_, { author, gitRepo, imageUrl, stars, date, version, license, createdBy }) => {
      const newDesign = await DesignModel.addDesign({
        author,
        gitRepo,
        imageUrl,
        stars,
        date,
        version,
        license,
        createdBy
      });
      return newDesign;
    }
  }
};
