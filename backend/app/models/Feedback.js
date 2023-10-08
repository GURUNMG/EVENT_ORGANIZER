// models/feedback.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  postId: String,
  feedbackEntries: [
    {
      email: String,
      informationGathered : Number,
      expectation: Number,
      timeManagement: Number,
      overallRating: Number,
      suggestion: String
    },
  ],
});

module.exports = mongoose.model('Feedback', feedbackSchema);
