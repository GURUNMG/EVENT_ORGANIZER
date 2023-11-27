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
    },
  ],
});

module.exports = mongoose.model('Feedback', feedbackSchema);
