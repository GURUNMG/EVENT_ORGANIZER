const Feedback = require('../models/Feedback');

// Controller to store new feedback or update existing feedback for a postId
const saveFeedback = async (req, res) => {
  try {
    const { postId, feedbackEntries } = req.body;

    // Find the feedback document by postId or create a new one if it doesn't exist
    let feedback = await Feedback.findOne({ postId });

    if (!feedback) {
      feedback = new Feedback({ postId });
    }

    // Add new feedback entries to the feedback document
    feedback.feedbackEntries.push(...feedbackEntries);

    // Save the updated feedback document
    await feedback.save();

    res.status(201).json({ message: 'Feedback saved successfully.' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Controller to fetch all feedback documents
const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = {
  saveFeedback,
  getAllFeedback,
};
