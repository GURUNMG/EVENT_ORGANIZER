const Post = require('../models/Post');

class PostService {
  async createPost(postData) {
    try {
      const post = new Post(postData);
      const savedPost = await post.save();
      return savedPost;
    } catch (error) {
      throw error;
    }
  }

  async getAllPosts() {
    try {
      const posts = await Post.find();
      return posts;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new PostService();
