// models/EventRegister.js
const mongoose = require('mongoose');

const eventRegisterSchema = new mongoose.Schema({
  email: String,
  postId: String,
  action: String,
});

module.exports = mongoose.model('EventRegister', eventRegisterSchema);
