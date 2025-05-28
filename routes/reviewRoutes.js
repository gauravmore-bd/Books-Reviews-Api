// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/books/:id/reviews', authMiddleware, reviewController.addReview);
router.put('/reviews/:id', authMiddleware, reviewController.updateReview);
router.delete('/reviews/:id', authMiddleware, reviewController.deleteReview);

module.exports = router;