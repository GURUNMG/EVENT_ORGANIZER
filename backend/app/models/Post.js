const mongoose = require('mongoose');

const getNextDayAtNoon = () => {
  const now = new Date();
  const nextDay = new Date(now);
  nextDay.setDate(now.getDate() + 1);
  nextDay.setHours(12, 0, 0, 0); // Set to 12:00:00:000 PM
  return nextDay;
};

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    // required: true,
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
