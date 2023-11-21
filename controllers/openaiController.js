const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function generatePrompt(animal) {
  // Generate your prompt here
}

async function getOpenAIResponse(req, res) {
  const animal = req.body.animal || '';
  if (animal.trim().length === 0) {
    return res.status(400).json({
      error: {
        message: 'Please enter a valid instruction',
      },
    });
  }

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(animal),
      temperature: 0.8,
      max_tokens: 150,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      });
    }
  }
}

module.exports = { getOpenAIResponse };
