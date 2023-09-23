const PostService = require('../services/postService');
const postService = new PostService();

// Example usage in a controller method
// async function createPost(req, res) {
//   try {
//     const post = req.body; // Assuming the POST request contains the post data
//     await postService.createPost(post);
//     res.status(201).json({ message: 'Post created successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

// async function getAllPosts(req, res) {
//   try {
//     const posts = await postService.getAllPosts();
//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }




// // controllers/postController.js
const Post = require('../models/Post');

const createPost = async (req, res) => {
  try {
    const { caption, email } = req.body;
    const image = req.file ? req.file.path : ''; // Store the image path here

    // You can add validation for required fields here

    const post = new Post({
      image,
      caption,
      email,
    });

    await post.save();

    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

async function getAllPosts(req, res) {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createPost,
  getAllPosts,
};