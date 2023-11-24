const Post = require('../models/Post');

class PostService {
  async createPost(post) {
    try {
      const { caption, email, date } = post;
      const image = post.image || ''; // Handle if image is null

      // Parse the date using JavaScript Date object
      const formattedDate = new Date(date);

      // You can add validation for required fields here

      const newPost = new Post({
        image,
        caption,
        email,
        date: formattedDate,
      });

      await newPost.save();
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

module.exports = PostService;


// services/postService.js
// const Post = require('../models/Post');

// exports.createPost = async (post) => {
//   try {
//     const { caption, email } = post;
//     const image = post.image || ''; // Handle if image is null

//     // You can add validation for required fields here

//     const newPost = new Post({
//       image,
//       caption,
//       email,
//     });

//     await newPost.save();
//   } catch (error) {
//     throw error;
//   }
// };

// exports.getAllPost = async ()=>{
//   try{
//     const posts = await Post.find();
//     return posts;
//   } catch(error){
//     throw error;
//   }
// }









// const Post = require('../models/Post');

// class PostService {
//   async createPost(image, caption, email) {
//     try {
//       // Assuming Multer has saved the image to the 'uploads/' directory
//       const imagePath = '/uploads/' + image.filename;

//       const post = new Post({
//         image: imagePath,
//         caption,
//         date: new Date(), // You can adjust this as needed
//         email,
//       });

//       await post.save();

//       return post;
//     } catch (error) {
//       throw error;
//     }
//   }
// }

// module.exports = new PostService();



// const Post = require('../models/Post');

// class PostService {
//   async createPost(postData) {
//     try {
//       const post = new Post(postData);
//       const savedPost = await post.save();
//       return savedPost;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async getAllPosts() {
//     try {
//       const posts = await Post.find();
//       return posts;
//     } catch (error) {
//       throw error;
//     }
//   }
// }

// module.exports = new PostService();
