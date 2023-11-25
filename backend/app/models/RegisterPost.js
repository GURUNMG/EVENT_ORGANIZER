const mongoose = require('mongoose');

const registerPostSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  registers: [
    {
      type: String,
      required: true,
    }
  ]
});

module.exports = mongoose.model('RegisterPost', registerPostSchema);
