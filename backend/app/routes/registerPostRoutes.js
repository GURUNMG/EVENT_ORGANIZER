const express = require('express');
const router = express.Router();
const registerPostController = require('../controllers/registerPostController');

// Endpoint for storing registered users with date
router.post('/store', registerPostController.storeRegisteredUsersWithDateController);

// Endpoint for getting registered users
router.get('/get/:postId', registerPostController.getRegisteredUsersController);

module.exports = router;
