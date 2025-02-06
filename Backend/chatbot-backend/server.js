const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const winston = require('winston');  // For structured logging

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());

// Use body parser to handle JSON requests
app.use(bodyParser.json());

// Logger Setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

// Define responses to content
const responses = {
  'What is your name?': 'I am a chatbot created to assist you.',
  'What can you do?': 'I can help you with car details, book test drives, and more!',
  'Learn About Cars': 'I can provide detailed information about cars. Which car model would you like to know about?',
  'Book a Test Drive': 'Please provide the car model and the date you would like to book for the test drive.',
  'Feedback': 'Please provide your feedback, and I’ll make sure it’s noted.',
  'Locations': 'We have multiple locations. Please tell me your preferred region or city.',
  'News': 'Check out the latest car news at our official website.',
  'Goodbye!': 'Goodbye! Have a great day!',
  'default': 'Sorry, I didn’t understand that. Can you try again?',
};

// Handle chatbot responses for predefined messages
app.post('/getBotResponse', (req, res) => {
  const userMessage = req.body.message.trim();
  const sessionId = req.body.sessionId || 'default-session-id';  // Unique session ID for each user

  // Check the message and find the appropriate response
  let botResponse = responses[userMessage] || responses['default'];

  // Log the interaction
  logger.info(`User Message: ${userMessage} | Bot Response: ${botResponse}`);

  // Send the response back to the frontend
  res.json({ reply: botResponse });
});

// Route to handle dynamic user messages using AI generation
app.post('/getDynamicResponse', async (req, res) => {
  const userMessage = req.body.message.trim();

  try {
    // Mocked AI response function (replace with actual AI service)
    const dynamicResponse = await getAIResponse(userMessage);

    // Log the interaction
    logger.info(`User Message: ${userMessage} | Generated Bot Response: ${dynamicResponse}`);

    // Send the generated response back to the frontend
    res.json({ reply: dynamicResponse });
  } catch (error) {
    logger.error(`Error generating response for message: ${userMessage} | Error: ${error.message}`);
    res.status(500).json({ reply: 'Sorry, I encountered an issue while processing your request.' });
  }
});

// Mocked AI response function (you would replace this with actual logic)
async function getAIResponse(userMessage) {
  // Mocked AI response (replace with real AI integration)
  return `Here is a dynamic response to: "${userMessage}"`;
}

// Default route to check if the server is running
app.get('/', (req, res) => {
  res.send('Chatbot Backend is running!');
});

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
