const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const errorHandler = require('./middleware/errorHandler');
const bugRoutes = require('./routes/bugs');

const helmet = require('helmet');
app.use(helmet());

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

app.use(express.json());

// ✅ Apply CORS and JSON middleware BEFORE any routes
const allowedOrigins = [
  'https://wss-edba4p6ew-viossixths-projects.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));


// ✅ Define your routes
app.use('/bugs', bugRoutes);

// ✅ Test route
app.get('/', (req, res) => {
  res.send('Bug Tracker API');
});

// ✅ Error handler LAST
app.use(errorHandler);

//Health check
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});


module.exports = app;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
