// routes/bookRoutes.js

const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');

// Add book (authenticated)
router.post('/books', authMiddleware, bookController.addBook);

// Get all books
router.get('/books', bookController.getAllBooks);

// Get book by ID
router.get('/books/:id', bookController.getBookById);

// Search
router.get('/books/search', bookController.searchBooks);

// Export the router
module.exports = router;