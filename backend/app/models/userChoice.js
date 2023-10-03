const mongoose = require('mongoose');

const userChoiceSchema = new mongoose.Schema({
  email: String,
  choices: [
    {
      postId: String,
      action: String,
    },
  ],
});

module.exports = mongoose.model('UserChoice', userChoiceSchema);
