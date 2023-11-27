const feedbackService = require('../services/feedbackService');

// Function to save new feedback entry
const submitFeedback = async (req, res) => {
  try {
    const { postId } = req.params;
    const { feedbackEntries } = req.body;
    // console.log(feedbackEntries);
    const result = await feedbackService.saveFeedbackEntry(postId, feedbackEntries);

    if (result.success) {
      res.status(201).json({ message: result.message });
    } else {
      res.status(500).json({ error: result.message });
    }
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Function to get all feedback for a postId
const getAllFeedbackForPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const result = await feedbackService.getAllFeedbackForPost(postId);

    if (result.success) {
      res.status(200).json({ feedbackEntries: result.feedbackEntries });
    } else {
      res.status(404).json({ error: result.message });
    }
  } catch (error) {
    console.error('Error getting feedback:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = {
  submitFeedback,
  getAllFeedbackForPost,
};



// const Feedback = require('../models/Feedback');

// const saveFeedbackEntry = async (postId, feedbackEntry) => {
//   try {
//     // Find the feedback document by postId
//     let feedback = await Feedback.findOne({ postId });

//     // If the feedback document doesn't exist, create a new one
//     if (!feedback) {
//       feedback = new Feedback({ postId, feedbackEntries: [] });
//     }

//     // Add the new feedback entry to the array
//     feedback.feedbackEntries.push(feedbackEntry);

//     // Save the updated feedback document
//     await feedback.save();

//     return { success: true, message: 'Feedback entry saved successfully.' };
//   } catch (error) {
//     console.error('Error saving feedback entry:', error);
//     return { success: false, message: 'Internal server error.' };
//   }
// };

// const getAllFeedbackForPost = async (postId) => {
//   try {
//     // Find the feedback document by postId
//     const feedback = await Feedback.findOne({ postId });

//     if (!feedback) {
//       return { success: false, message: 'Feedback not found.' };
//     }

//     // Return all feedback entries for the given postId
//     return { success: true, feedbackEntries: feedback.feedbackEntries };
//   } catch (error) {
//     console.error('Error getting feedback:', error);
//     return { success: false, message: 'Internal server error.' };
//   }
// };

// module.exports = {
//   saveFeedbackEntry,
//   getAllFeedbackForPost,
// };
