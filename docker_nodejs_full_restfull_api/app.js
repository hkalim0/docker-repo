const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect('mongodb://mongodb:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Redis Connection
const redisClient = redis.createClient({ host: 'redis', port: 6379 });

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define a sample route
app.get('/', (req, res) => {
  res.send('Hello, Dockerized Node.js App with MongoDB and Redis!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
