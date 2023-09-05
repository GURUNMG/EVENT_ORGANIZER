const userService = require('../services/userService');

class UserController {
  async registerUser(req, res) {
    try {
      const { userName, email, password } = req.body;
      await userService.registerUser(userName, email, password);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const token = await userService.loginUser(email, password);
      res.status(200).json({ token, message:"login success"});
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
