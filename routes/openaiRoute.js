const express = require('express');
const router = express.Router();
const openaiController = require('../controllers/openaiController');

// Define your OpenAI route
router.post('/openai', openaiController.getOpenAIResponse);

module.exports = router;
