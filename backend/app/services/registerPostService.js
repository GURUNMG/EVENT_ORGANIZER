const RegisterPost = require('../models/RegisterPost');

const storeRegisteredUsersWithDate = async (postId, email, date) => {
  try {
    // Find the existing document for the given postId
    let registerPost = await RegisterPost.findOne({ postId });

    // If the document doesn't exist, create a new one
    if (!registerPost) {
      registerPost = new RegisterPost({ postId, date, registers: [] });
    }

    // Add the new registration with email to the array
    registerPost.registers.push(email);

    // Save the updated document
    await registerPost.save();

    return { success: true, message: 'Registered users with date stored successfully.' };
  } catch (error) {
    console.error('Error storing registered users with date:', error);
    return { success: false, error: 'Internal server error.' };
  }
};

const getRegisteredUsers = async (postId) => {
    try {
      // Find the document for the given postId
      const registerPost = await RegisterPost.findOne({ postId });
  
      if (!registerPost) {
        return { success: false, error: 'Registered users not found.' };
      }
  
      // Extracting relevant information
      const { registers, date } = registerPost;
  
      // Formatting date components
      const formattedDate = new Date(date);
      const formattedTime = formattedDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
      const formattedAMPM = formattedDate.toLocaleTimeString('en-US', { hour12: true });
  
      // Return the array of registered users, date, time, and AM/PM
      return {
        success: true,
        data: {
          registeredUsers: registers,
          date: formattedDate.toLocaleDateString(),
          time: formattedTime,
        //   ampm: formattedAMPM,
        },
      };
    } catch (error) {
      console.error('Error getting registered users:', error);
      return { success: false, error: 'Internal server error.' };
    }
  };  

module.exports = {
  storeRegisteredUsersWithDate,
  getRegisteredUsers,
};
