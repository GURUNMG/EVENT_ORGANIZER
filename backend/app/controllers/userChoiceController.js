const UserChoice = require('../models/userChoice');

// Function to save a new user choice
const saveUserChoice = async (req, res) => {
  try {
    const { email, postId, action } = req.body;

    // Find the user's choice document by email
    let userChoice = await UserChoice.findOne({ email });

    // If the user's choice document doesn't exist, create a new one
    if (!userChoice) {
      userChoice = new UserChoice({ email, choices: [] });
    }

    // Check if a choice with the same postId already exists
    const existingChoice = userChoice.choices.find((choice) => choice.postId === postId);

    if (existingChoice) {
      // Update the action for the existing choice
      existingChoice.action = action;
    } else {
      // Add the new choice to the array
      userChoice.choices.push({ postId, action });
    }

    // Save the updated user's choice document
    await userChoice.save();

    res.status(201).json({ message: 'User choice saved successfully.' });
  } catch (error) {
    console.error('Error saving user choice:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Function to get all user choices for a specific email
const getAllUserChoices = async (req, res) => {
  try {
    const { email } = req.params;

    // Find the user's choice document by email
    const userChoice = await UserChoice.findOne({ email });

    if (!userChoice) {
      return res.status(404).json({ error: 'User choices not found.' });
    }

    // Return all user choices for the given email
    res.status(200).json({ choices: userChoice.choices });
  } catch (error) {
    console.error('Error getting user choices:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = {
  saveUserChoice,
  getAllUserChoices,
};
