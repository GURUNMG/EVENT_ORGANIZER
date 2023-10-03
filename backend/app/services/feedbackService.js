// services/feedbackService.js
const Feedback = require('../models/Feedback');

// Function to save new feedback entry
const saveFeedbackEntry = async (postId, feedbackEntry) => {
  try {
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
  } catch (error) {
    console.error('Error storing feedback entry:', error);
    throw new Error('Failed to store feedback entry.');
  }
};

// Function to get all feedback for a postId
const getAllFeedbackForPost = async (postId) => {
  try {
    // Find the feedback document by postId
    const feedback = await Feedback.findOne({ postId });

    if (!feedback) {
      throw new Error('Feedback not found.');
    }

    // Return all feedback entries for the given postId
    return feedback.feedbackEntries;
  } catch (error) {
    console.error('Error getting feedback:', error);
    throw new Error('Failed to get feedback.');
  }
};

module.exports = {
  saveFeedbackEntry,
  getAllFeedbackForPost,
};
