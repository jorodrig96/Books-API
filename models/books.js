const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const booksSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        default: "I'll let you read the book yourself and findout."
    },
    year: {
        type: Number,
        default: 'This book is ageless.'
    },
    quantity: {
        type: Number,
        required: true
    },
    imageURL: {
        type: String,
        default: 'https://www.seekpng.com/png/detail/119-1193182_dibujo-de-libro-para-colorear-coloring-book.png'
    }
})

const Book = model('Book', booksSchema);

module.exports = Book;

