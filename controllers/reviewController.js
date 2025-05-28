const db = require('../models/db');

exports.addReview = (req, res) => {
    const bookId = req.params.id;
    const userId = req.user.id;
    const { rating, comment } = req.body;

    const checkSql = 'SELECT * FROM reviews WHERE book_id = ? AND user_id = ?';
    db.query(checkSql, [bookId, userId], (err, results) => {
        if (results.length > 0) {
            return res.status(400).json({ error: 'You already reviewed this book' });
        }

        const sql = 'INSERT INTO reviews (book_id, user_id, rating, comment) VALUES (?, ?, ?, ?)';
        db.query(sql, [bookId, userId, rating, comment], (err, result) => {
            if (err) return res.status(500).json({ error: 'Error adding review' });
            res.status(201).json({ message: 'Review added' });
        });
    });
};

exports.updateReview = (req, res) => {
    const reviewId = req.params.id;
    const userId = req.user.id;
    const { rating, comment } = req.body;

    const checkSql = 'SELECT * FROM reviews WHERE id = ? AND user_id = ?';
    db.query(checkSql, [reviewId, userId], (err, results) => {
        if (results.length === 0) return res.status(403).json({ error: 'Not allowed' });

        const updateSql = 'UPDATE reviews SET rating = ?, comment = ? WHERE id = ?';
        db.query(updateSql, [rating, comment, reviewId], (err) => {
            if (err) return res.status(500).json({ error: 'Failed to update review' });
            res.json({ message: 'Review updated' });
        });
    });
};

exports.deleteReview = (req, res) => {
    const reviewId = req.params.id;
    const userId = req.user.id;

    const checkSql = 'SELECT * FROM reviews WHERE id = ? AND user_id = ?';
    db.query(checkSql, [reviewId, userId], (err, results) => {
        if (results.length === 0) return res.status(403).json({ error: 'Not allowed' });

        const deleteSql = 'DELETE FROM reviews WHERE id = ?';
        db.query(deleteSql, [reviewId], (err) => {
            if (err) return res.status(500).json({ error: 'Failed to delete review' });
            res.json({ message: 'Review deleted' });
        });
    });
};