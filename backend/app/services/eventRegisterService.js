// services/eventRegisterService.js
const EventRegister = require('../models/EventRegister');

// Function to store event registration
const storeEventRegistration = async (email, postId, action) => {
  try {
    // Create a new event registration
    const eventRegistration = new EventRegister({
      email,
      postId,
      action,
    });

    // Save the event registration to the database
    await eventRegistration.save();
  } catch (error) {
    console.error('Error storing event registration:', error);
    throw new Error('Failed to store event registration.');
  }
};


const getAllEventRegistrations = async () => {
    try {
      // Fetch all event registrations from the database
      const eventRegistrations = await EventRegister.find();
      return eventRegistrations;
    } catch (error) {
      console.error('Error fetching event registrations:', error);
      throw new Error('Failed to fetch event registrations.');
    }
  };
  
  module.exports = {
    storeEventRegistration,
    getAllEventRegistrations,
  };