const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    // required : true
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Post', postSchema);
