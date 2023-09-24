// const express = require('express');
// const router = express.Router();
// const postController = require('../controllers/postcontroller');

// // Create a new userpost
// // router.post('/create', postController.createPost);



// const upload = multer({ storage }); // Use the Multer storage defined earlier

// // Create a new userpost
// router.post('/create', upload.single('image'), postController.createPost);
// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const postController = require('../controllers/postController');


// // Create a new post
// router.post('/create', postController.createPost);

// // Get all posts
// // router.get('/all', postController.getAllPosts);

// // Other routes as needed

// module.exports = router;






// routes/postRoutes.js
const express = require('express');
const multer = require('multer');
const { createPost, getAllPosts } = require('../controllers/postcontroller');
const path = require('path')
const router = express.Router();

// Configure multer for file uploads
// const destinationPath = path.join(__dirname, '..', '..', '..','..','frontend', 'src', 'image', image);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '..', '..', '..', 'frontend', 'src', 'media');
    cb(null, uploadPath); // Set the destination folder for image uploads
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = uniqueSuffix + '-' + file.originalname;
    cb(null, fileName); // Set the file name for image uploads
    req.fileName = fileName;
  },
});

const upload = multer({ storage: storage });

// Define the route for adding a post
router.post('/eventpost', upload.single('image'), createPost);
router.get('/allpost',getAllPosts)

module.exports = router;
