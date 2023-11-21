const express = require('express');
const router = express.Router();
const authController = require('../../controllers/nala/authController.js');

// Route for user login
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/verifyEmail', authController.getEmail);

module.exports = router;
