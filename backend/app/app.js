const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGODB_URI, PORT } = require('./config/keys');
const multer = require('multer')
const path = require('path')
const app = express();

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
    cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
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
app.use('/event/app/v1/admin-post', require('./routes/postRoutes'));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require('express');
// const mongoose = require('mongoose');
// const userRoutes = require('./routes/userRoutes');
// const path = require('path'); 

// require('dotenv').config({ path: path.join(__dirname, '../.env') });

// const app = express();
// const PORT = process.env.PORT || 3002;


// app.use(express.json());

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// app.use('event/v1/', userRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });






