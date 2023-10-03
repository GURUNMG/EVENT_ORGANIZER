// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Route to save new feedback entry
router.post('/store', async (req, res) => {
  await feedbackController.saveFeedbackEntry(req, res);
});

// Route to get all feedback for a postId
router.get('/:postId', async (req, res) => {
  await feedbackController.getAllFeedbackForPost(req, res);
});

module.exports = router;
