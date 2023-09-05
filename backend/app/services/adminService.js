const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');

class AdminService {
  async registerAdmin(userName, email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = new Admin({ userName, email, password: hashedPassword });
      await admin.save();
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async loginAdmin(email, password) {
    try {
      const admin = await Admin.findOne({ email });

      if (!admin) {
        throw new Error('Admin not found');
      }

      const isPasswordValid = await bcrypt.compare(password, admin.password);

      if (!isPasswordValid) {
        throw new Error('Incorrect password');
      }

      const token = jwt.sign({ adminId: admin._id }, JWT_SECRET, {
        expiresIn: '1h',
      });

      return token;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AdminService();
