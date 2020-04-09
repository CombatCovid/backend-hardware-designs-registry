import PostModel from './methods';
import { ResolverMap } from '../../types';

export const resolvers: ResolverMap = {
  Query: {
    getPosts: async (): Promise<any> => {
      const posts = await PostModel.getPosts();
      return posts;
    }
  },

  Mutation: {
    addPost: async (_: any, { createdBy, ...args }: GQL.IAddPostOnMutationArguments): Promise<any> => {
      const newPost = await PostModel.addPost({
        ...args,
        createdBy
      });
      return newPost;
    }
  }
};
