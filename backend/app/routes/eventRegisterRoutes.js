// routes/eventRegisterRoutes.js
const express = require('express');
const { saveFeedback,getAllFeedback } = require('../controllers/eventRegisterController');

const router = express.Router();

// API route to register an event
router.post('/event', saveFeedback);
router.get('/all',getAllFeedback);


module.exports = router;
