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
