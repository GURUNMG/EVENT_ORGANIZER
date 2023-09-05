// const express = require('express');
// const router = express.Router();
// const postController = require('../controllers/postcontroller');

// // Create a new userpost
// // router.post('/create', postController.createPost);



// const upload = multer({ storage }); // Use the Multer storage defined earlier

// // Create a new userpost
// router.post('/create', upload.single('image'), postController.createPost);
// module.exports = router;


const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');


// Create a new post
router.post('/create', postController.createPost);

// Get all posts
router.get('/all', postController.getAllPosts);

// Other routes as needed

module.exports = router;
