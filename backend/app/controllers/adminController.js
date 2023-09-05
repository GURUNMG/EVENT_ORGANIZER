const adminService = require('../services/adminService');

class AdminController {
  async registerAdmin(req, res) {
    try {
      const { userName, email, password } = req.body;
      await adminService.registerAdmin(userName, email, password);
      res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async loginAdmin(req, res) {
    try {
      const { email, password } = req.body;
      const token = await adminService.loginAdmin(email, password);
      res.status(200).json({ token, message:"login success" });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = new AdminController();
