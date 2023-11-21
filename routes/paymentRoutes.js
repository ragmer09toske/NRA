const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Generate client token
router.get('/client_token', paymentController.generateClientToken);

// Process payment
router.post('/process_payment', paymentController.processPayment);

module.exports = router;