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

    // Check if the user has already submitted feedback
    const existingEntryIndex = feedback.feedbackEntries.findIndex(
      (entry) => entry.email === feedbackEntry.email
    );

    if (existingEntryIndex !== -1) {
      // If the user has already submitted feedback, update the existing entry
      feedback.feedbackEntries[existingEntryIndex] = feedbackEntry;
    } else {
      // If the user has not submitted feedback, add a new entry
      feedback.feedbackEntries.push(feedbackEntry);
    }

    // Save the updated feedback document
    await feedback.save();

    return { success: true, message: 'Feedback entry saved successfully.' };
  } catch (error) {
    console.error('Error saving feedback entry:', error);
    return { success: false, message: 'Internal server error.' };
  }
};

// Function to get all feedback for a postId
const getAllFeedbackForPost = async (postId) => {
  try {
    // Find the feedback document by postId
    const feedback = await Feedback.findOne({ postId });

    if (!feedback) {
      return { success: false, message: 'Feedback not found.' };
    }

    // Return all feedback entries for the given postId
    return { success: true, feedbackEntries: feedback.feedbackEntries };
  } catch (error) {
    console.error('Error getting feedback:', error);
    return { success: false, message: 'Internal server error.' };
  }
};

module.exports = {
  saveFeedbackEntry,
  getAllFeedbackForPost,
};


// const feedbackController = require('../controllers/feedbackController');

// const saveFeedbackEntry = async (postId, feedbackEntry) => {
//   return await feedbackController.saveFeedbackEntry(postId, feedbackEntry);
// };

// const getAllFeedbackForPost = async (postId) => {
//   return await feedbackController.getAllFeedbackForPost(postId);
// };

// module.exports = {
//   saveFeedbackEntry,
//   getAllFeedbackForPost,
// };
