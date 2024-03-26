const express = require('express');
const booksRouter = express.Router();

const Book = require('../models/books');

booksRouter.get('/seed', (req, res) => {
    Book.insertMany([{
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
      },
      {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
      },
      {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
      },
      {
        "title": "Wâˆ€RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg"
      }])
        .then(res.status(200).json({
            message: 'Seed successful'
        }))
        .catch(res.status(400).json({
            message: 'Seed unsuccessful'
        }))
})


// GET all books
booksRouter.get("/", async (req, res) => {
    try {
      const allBooks = await Book.find();
      res.status(200).json(allBooks);
    } catch (error) {
      res.status(500).json({ message: "Error", error: error.message });
    }
  });
  
  // GET specific book
  booksRouter.get("/:id", async (req, res) => {
    const bookId = req.params.id;
  
    try {
      const book = await Book.findById(bookId);
  
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: "Error", error: error.message });
    }
  });
  
  // PATCH/PUT update a specific book
  booksRouter.patch("/:id", async (req, res) => {
    const bookId = req.params.id;
    const updateData = req.body;
  
    try {
      const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, {
        new: true,
      });
  
      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      res.status(200).json(updatedBook);
    } catch (error) {
      res.status(500).json({ message: "Error", error: error.message });
    }
  });
  
  // DELETE delete a specific book
  booksRouter.delete("/:id", async (req, res) => {
    const bookId = req.params.id;
  
    try {
      const deletedBook = await Book.findByIdAndDelete(bookId);
  
      if (!deletedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error", error: error.message });
    }
  });
  
  // POST create a new book
  booksRouter.post("/", async (req, res) => {
    const newBookData = req.body;
    
    try {
      const newBook = await Book.create(newBookData);
      res.status(201).json(newBook);
    } catch (error) {
      res.status(500).json({ message: "Error", error: error.message });
    }
  });
  

module.exports = booksRouter;