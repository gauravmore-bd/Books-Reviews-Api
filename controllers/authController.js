// controllers/authController.js
const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async(req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists by email
        db.query('SELECT * FROM users WHERE email = ?', [email], async(err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            if (results.length > 0) {
                return res.status(400).json({ error: 'User with this email already exists' });
            }

            // Hash password and insert
            const hashedPassword = await bcrypt.hash(password, 10);

            db.query(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword],
                (err, result) => {
                    if (err) {
                        console.error('Insert error:', err);
                        return res.status(500).json({ error: 'Error creating user' });
                    }

                    res.status(201).json({ message: 'User registered successfully' });
                }
            );
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};


exports.login = (req, res) => {
    console.log("Login API called");
    const { email, password } = req.body;
    console.log("Received:", email, password);

    db.query('SELECT * FROM users WHERE email = ?', [email], async(err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            console.log(`No user found for email: ${email}`);
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = results[0];
        console.log("User found:", user);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        try {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            console.log("JWT token generated successfully");
            res.json({ token });
        } catch (err) {
            console.error('JWT sign error:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
};