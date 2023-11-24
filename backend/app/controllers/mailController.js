// controllers/mailController.js
const mailService = require('../services/mailService');

const sendEmailNotifications = async (req, res) => {
  try {
    await mailService.checkAndSendEmailNotifications();
    res.status(200).json({ message: 'Email notifications sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = { sendEmailNotifications };
