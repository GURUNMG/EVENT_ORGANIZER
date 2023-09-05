const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');

class UserService {
  async registerUser(userName, email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ userName, email, password: hashedPassword });
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async loginUser(email, password) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error('Incorrect password');
      }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: '1h',
      });

      return token;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
