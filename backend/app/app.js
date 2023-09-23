const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGODB_URI, PORT } = require('./config/keys');
const multer = require('multer')
const path = require('path')
const app = express();
const nodemailer = require('nodemailer');

// Database connection
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Middleware
app.use(cors());
app.use(express.json());

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/guru/'); // Specify the directory where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage }); // Create a Multer instance


// Routes
app.use('/event/app/v1/user', require('./routes/userRoutes'));
app.use('/event/app/v1/admin', require('./routes/adminRoutes'));
app.use('/event/app/v1/', require('./routes/postRoutes'));
app.post('/sendemail', async (req, res) => {
  try {
      if (!recipientEmail) {
      return res.status(400).json({ error: 'Recipient email is required' });
    }
    await sending(req.body);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

async function sending(details){
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gurubharan.cs20@bitsathy.ac.in',
        pass: 'mebtznguodidmarf'
    }
  });

  const mailOptions = {
      from: 'gurubharan.cs20@bitsathy.ac.in',
      to: details.email,
      subject: details.subject,
      text: details.message
  };

  const info =await transporter.sendMail(mailOptions);
  console.log('Message sent:');
}
// sending().then(result=>console.log("email sent")).catch(error=>console.log(error))









