import { Post } from '../schemas';

class PostModel {
  public async getPosts() {
    try {
      const posts = await Post.find({})
        .sort({ createdDate: 'desc' })
        .populate({
          path: 'createdBy',
          model: 'User'
        });

      return posts;
    } catch (error) {
      throw error;
    }
  }

  public async addPost(obj) {
    try {
      const newPost = await new Post(obj).save();
      return newPost;
    } catch (error) {
      throw error;
    }
  }
}

export default new PostModel();
