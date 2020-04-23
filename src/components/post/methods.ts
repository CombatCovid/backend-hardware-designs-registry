import { Post } from './post.model';

export default {
  getPosts: async (): Promise<any> => {
    try {
      const posts = await Post.find({}).sort({ createdDate: 'desc' }).populate({
        path: 'createdBy',
        model: 'User'
      });

      return posts;
    } catch (error) {
      throw new Error(error);
    }
  },

  addPost: async (obj: GQL.IAddPostOnMutationArguments): Promise<any> => {
    try {
      const newPost = await new Post(obj).save();
      return newPost;
    } catch (error) {
      throw new Error(error);
    }
  }
};
