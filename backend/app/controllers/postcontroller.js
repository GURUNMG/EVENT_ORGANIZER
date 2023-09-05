const postService = require('../services/postService');

class PostController {
  async createPost(req, res) {
    try {
      const { caption, date, email, image } = req.body;
      const postData = {
        caption,
        date,
        email,
        image,
      };
      const savedPost = await postService.createPost(postData);
      res.json(savedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAllPosts(req, res) {
    try {
      const posts = await postService.getAllPosts();
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error is it' });
    }
  }
}

module.exports = new PostController();
