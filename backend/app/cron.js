// cron.js
const cron = require('node-cron');
const mailService = require('./services/mailService');

// Schedule the email sending task every minute
cron.schedule('* * * * *', mailService.checkAndSendEmailNotifications);
