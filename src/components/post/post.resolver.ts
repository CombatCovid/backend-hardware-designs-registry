import { PostModel } from './models';

export const postResolver = {
  Query: {
    getPosts: async (_, args) => {
      const posts = await PostModel.getPosts();
      return posts;
    }
  },

  Mutation: {
    addPost: async (_, { title, imageUrl, categories, description, creatorId }) => {
      const newPost = await PostModel.addPost({
        title,
        imageUrl,
        categories,
        description,
        createdBy: creatorId
      });
      return newPost;
    }
  }
};
