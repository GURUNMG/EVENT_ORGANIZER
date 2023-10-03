const express = require('express');
const router = express.Router();
const userChoiceController = require('../controllers/userChoiceController');

// Route to save a new user choice
router.post('/store', async (req, res) => {
  await userChoiceController.saveUserChoice(req, res);
});

// Route to get all user choices for a specific email
router.get('/:email', async (req, res) => {
  await userChoiceController.getAllUserChoices(req, res);
});

module.exports = router;
