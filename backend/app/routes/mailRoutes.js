// routes/mailRoutes.js
const express = require('express');
const mailController = require('../controllers/mailController');

const router = express.Router();

router.post('/sendEmailNotifications', mailController.sendEmailNotifications);

module.exports = router;
