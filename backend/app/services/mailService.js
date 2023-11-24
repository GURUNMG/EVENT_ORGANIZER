// services/mailService.js
const nodemailer = require('nodemailer');
const Post = require('../models/Post');
const UserChoice = require('../models/userChoice');

const transporter = nodemailer.createTransport({
  // configure your email transport options
  // ...
});

const checkAndSendEmailNotifications = async () => {
  try {
    const posts = await Post.find({ date: { $gt: new Date() } }).exec();

    posts.forEach(async (post) => {
      const users = await UserChoice.find({ 'choices.postId': post._id }).exec();

      users.forEach((user) => {
        const userChoice = user.choices.find((choice) => choice.postId === post._id);

        if (userChoice && userChoice.action === 'ACCEPT') {
          const eventTime = post.date.getTime();
          const currentTime = new Date().getTime();
          const timeDifference = eventTime - currentTime;

          // Send email 10 minutes before the event
          if (timeDifference > 0 && timeDifference <= 600000) {
            const mailOptions = {
              // configure your email content
              // ...
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
          }
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { checkAndSendEmailNotifications };
