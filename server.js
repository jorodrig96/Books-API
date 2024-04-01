const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv').config();
const PORT = process.env.PORT;
const booksController = require('./controllers/booksController');


// CONNECTING TO MOGOOSE DATABASE
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log(`You have been connected your your mongoose server: ${process.env.MONGO_URI}.`);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB.', error);
  });

// ROUTES
app.use(express.json())
app.use('/books', booksController);

// INITIAL ROUTE
app.get('/', (req, res) => {
    res.send('<h1>Hello, this is your home page</h1>')
})

app.get('*', (req, res) => {
    res.send('<h1>Error, page not found!</h1>')
})

app.listen(PORT, (error) => {
    if (error) {
      console.error('Error starting the server:', error);
    } else {
      console.log(`Server is running on Port ${PORT}!`);
    }
  });

module.exports = app;



