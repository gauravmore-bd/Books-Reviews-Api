// controllers/bookController.js
const db = require('../models/db');

exports.addBook = (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ error: 'Title and Author are required' });
    }

    db.query('INSERT INTO books (title, author) VALUES (?, ?)', [title, author], (err, result) => {
        if (err) {
            console.error('DB Insert Error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(201).json({ message: 'Book added successfully', bookId: result.insertId });
    });
};

exports.getAllBooks = (req, res) => {
    const { page = 1, limit = 10, author, genre } = req.query;
    const offset = (page - 1) * limit;

    let sql = 'SELECT * FROM books WHERE 1=1';
    const params = [];

    if (author) {
        sql += ' AND author LIKE ?';
        params.push(`%${author}%`);
    }
    if (genre) {
        sql += ' AND genre LIKE ?';
        params.push(`%${genre}%`);
    }

    sql += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    db.query(sql, params, (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch books' });
        res.json(results);
    });
};

exports.getBookById = (req, res) => {
    const bookId = req.params.id;
    const bookQuery = 'SELECT * FROM books WHERE id = ?';
    const reviewQuery = 'SELECT * FROM reviews WHERE book_id = ? LIMIT ? OFFSET ?';
    const avgQuery = 'SELECT AVG(rating) AS averageRating FROM reviews WHERE book_id = ?';

    db.query(bookQuery, [bookId], (err, bookResults) => {
        if (err || bookResults.length === 0) return res.status(404).json({ error: 'Book not found' });

        db.query(avgQuery, [bookId], (err, avgResult) => {
            const averageRating = avgResult[0].averageRating || 0;

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const offset = (page - 1) * limit;

            db.query(reviewQuery, [bookId, limit, offset], (err, reviewResults) => {
                res.json({
                    ...bookResults[0],
                    averageRating: parseFloat(averageRating).toFixed(2),
                    reviews: reviewResults
                });
            });
        });
    });
};

exports.searchBooks = (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Query parameter required' });

    const sql = `SELECT * FROM books WHERE LOWER(title) LIKE ? OR LOWER(author) LIKE ?`;
    const searchTerm = `%${query.toLowerCase()}%`;

    db.query(sql, [searchTerm, searchTerm], (err, results) => {
        if (err) return res.status(500).json({ error: 'Search failed' });
        res.json(results);
    });
};