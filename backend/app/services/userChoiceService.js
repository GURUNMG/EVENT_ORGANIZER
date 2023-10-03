const UserChoice = require('../models/userChoice');

// Function to save a new user choice
const saveUserChoice = async (email, postId, action) => {
  try {
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
  } catch (error) {
    console.error('Error saving user choice:', error);
    throw new Error('Failed to save user choice.');
  }
};

// Function to get all user choices for a specific email
const getAllUserChoices = async (email) => {
  try {
    // Find the user's choice document by email
    const userChoice = await UserChoice.findOne({ email });

    if (!userChoice) {
      return null;
    }

    return userChoice.choices;
  } catch (error) {
    console.error('Error getting user choices:', error);
    throw new Error('Failed to get user choices.');
  }
};

module.exports = {
  saveUserChoice,
  getAllUserChoices,
};
