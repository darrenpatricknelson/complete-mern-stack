const express = require('express');
// mongoose
const mongoose = require('mongoose');
// require the routes
const routes = require('./routes/routes.js');
// dotenv for privacy
require('dotenv').config();

// initialize express app
const app = express();

// middleware
app.use(express.json());
// simple middleware to log out path requests and methods
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// initial welcome
app.get('/', (req, res) => {
  res.json({
    message: 'Hello'
  });
});

// routes
app.use('/api/cars/', routes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listening on port
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Connected to DB and listening on port ${PORT}!`);
    });
  })
  .catch(error => {
    console.log(error);
  });
