
// const Post = require('../models/Post');
// const fs = require('fs');
// const path = require('path');

// exports.createPost = async (req, res) => {
//   try {
//     const { caption, email } = req.body;
//     const image = req.file ? req.file.filename : ''; // Get the uploaded image filename

//     // Move the uploaded image to the frontend location
//     console.log(__dirname)
//     const sourcePath = path.join(__dirname, '..', 'uploads', image);
//     if (fs.existsSync(sourcePath)) {
//       // File exists, proceed with renaming
//       fs.renameSync(sourcePath, destinationPath);
//     } else {
//       console.error('File does not exist at source path:', sourcePath);
//       // Handle the error or send an appropriate response
//     }
//     const destinationPath = path.join(__dirname, '..', '..', '..','..','frontend', 'src', 'image', image);
    
//     fs.renameSync(sourcePath, destinationPath);

//     // Store the image path and other data in MongoDB
//     const newPost = new Post({
//       caption,
//       email,
//       image: path.join('images', image), // Store the relative path to the image
//     });

//     await newPost.save();

//     res.json({ message: 'Image uploaded and data stored' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

const PostService = require('../services/postService');
const postService = new PostService();
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