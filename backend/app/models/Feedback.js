// models/feedback.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  postId: String,
  feedbackEntries: [
    {
      email: String,
      increasePreference: [String],
      timeManagement: String,
      suggestion: String,
      overallRating: String,
    },
  ],
});

module.exports = mongoose.model('Feedback', feedbackSchema);
