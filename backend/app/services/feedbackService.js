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
