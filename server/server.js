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
  useNewUrlParser: true,
  useUnifiedTopology: true,
   maxPoolSize: 10
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

app.use(express.json());

// ✅ Apply CORS and JSON middleware BEFORE any routes
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH','DELETE'],
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
