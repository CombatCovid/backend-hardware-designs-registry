<<<<<<< HEAD:src/components/post/methods/index.ts
import { Post } from '../../../models/post';
=======
/**
 * narration-sd
 * 
 * This is model where we can interact with db operation
 */
import { Post } from '../schemas';
>>>>>>> 344dbe59dab7fc29e2282f2502d07e740cb5a37d:src/components/post/models/post.model.ts

export default {
  getPosts: async (): Promise<any> => {
    try {
      const posts = await Post.find({})
        .sort({ createdDate: 'desc' })
        .populate({
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
