const registerPostService = require('../services/registerPostService');

const storeRegisteredUsersWithDateController = async (req, res) => {
  const { email, postId, date } = req.body;
  const result = await registerPostService.storeRegisteredUsersWithDate(postId, email, date);

  if (result.success) {
    res.status(201).json({ message: result.message });
  } else {
    res.status(500).json({ error: result.error });
  }
};

const getRegisteredUsersController = async (req, res) => {
    const { postId } = req.params;
    const result = await registerPostService.getRegisteredUsers(postId);
  
    if (result.success) {
      const { registeredUsers, date, time, ampm } = result.data;
      res.status(200).json({ registeredUsers, date, time, ampm });
    } else {
      res.status(404).json({ error: result.error });
    }
  };
  

module.exports = {
  storeRegisteredUsersWithDateController,
  getRegisteredUsersController,
};
