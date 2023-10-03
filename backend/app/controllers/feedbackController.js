// controllers/feedbackController.js
const Feedback = require('../models/Feedback');

// Function to save new feedback entry
const saveFeedbackEntry = async (req, res) => {
  try {
    const { postId, feedbackEntry } = req.body;

    // Check if the required fields are provided
    if (!postId || !feedbackEntry) {
      return res.status(400).json({ error: 'Post ID and feedback entry are required.' });
    }

    // Find the feedback document by postId
    let feedback = await Feedback.findOne({ postId });

    // If the feedback document doesn't exist, create a new one
    if (!feedback) {
      feedback = new Feedback({ postId, feedbackEntries: [] });
    }

    // Add the new feedback entry to the array
    feedback.feedbackEntries.push(feedbackEntry);

    // Save the updated feedback document
    await feedback.save();

    res.status(201).json({ message: 'Feedback entry saved successfully.' });
  } catch (error) {
    console.error('Error saving feedback entry:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Function to get all feedback for a postId
const getAllFeedbackForPost = async (req, res) => {
  try {
    const { postId } = req.params;

    // Find the feedback document by postId
    const feedback = await Feedback.findOne({ postId });

    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found.' });
    }

    // Return all feedback entries for the given postId
    res.status(200).json({ feedbackEntries: feedback.feedbackEntries });
  } catch (error) {
    console.error('Error getting feedback:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = {
  saveFeedbackEntry,
  getAllFeedbackForPost,
};
