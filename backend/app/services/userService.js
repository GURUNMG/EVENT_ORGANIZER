const User = require('../models/user');

async function createUser(userName, email, password) {
  const newUser = new User({
    userName,
    email,
    password,
  });
  await newUser.save();
}

async function findUserByEmail(email) {
  return User.findOne({ email });
}

module.exports = {
  createUser,
  findUserByEmail,
};
