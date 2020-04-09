import { PostModel } from './models';

export const postResolver = {
  Query: {
    getPosts: async (): Promise<any> => {
      const posts = await PostModel.getPosts();
      return posts;
    }
  },

  Mutation: {
    addPost: async (_: any, { creatorId, ...args }): Promise<any> => {
      const newPost = await PostModel.addPost({
        ...args,
        createdBy: creatorId
      });
      return newPost;
    }
  }
};
