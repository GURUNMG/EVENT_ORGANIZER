const bcrypt = require('bcrypt');
const userService = require('../services/userService');

async function register(req, res) {
  const { userName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await userService.createUser(userName, email, hashedPassword);
    res.status(201).send('User registered successfully.');
  } catch (error) {
    res.status(500).send('An error occurred.');
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(401).send('Authentication failed.');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Authentication failed.');
    }
    res.status(200).send('Login successful.');
  } catch (error) {
    res.status(500).send('An error occurred.');
  }
}

module.exports = {
  register,
  login,
};
