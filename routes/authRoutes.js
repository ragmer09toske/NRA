const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Replace this with your own secret key
const authController = require('../controllers/authController.js');

// Route for user login
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
