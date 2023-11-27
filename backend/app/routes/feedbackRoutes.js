const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Route to submit feedback for a specific post
router.post('/store/:postId', feedbackController.submitFeedback);

// Route to get all feedback for a specific post
router.get('/get/:postId', feedbackController.getAllFeedbackForPost);

module.exports = router;
