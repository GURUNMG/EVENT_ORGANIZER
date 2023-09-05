const crypto = require('crypto');
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

module.exports = {
  JWT_SECRET: secretKey,
  MONGODB_URI: 'mongodb://localhost:27017/organizer',
  PORT: process.env.PORT || 3001,
};
