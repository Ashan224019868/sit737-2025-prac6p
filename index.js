// Require express and winston
const express = require('express');

// In the Node.js application code, require the Winston library and create a new logger object:
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'calculator-microservice' },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

const app = express();
const port = 3000;

// Helper to check if value is a number
function isValidNumber(value) {
  return !isNaN(value);
}

// Addition route
app.get('/add', (req, res) => {
  const { num1, num2 } = req.query;

  if (!isValidNumber(num1) || !isValidNumber(num2)) {
    logger.error('Invalid numbers provided for addition');
    return res.status(400).send('Please provide valid numbers.');
  }

  const result = Number(num1) + Number(num2);


  // Wherever app wants to log a message in the application code, use the logger.log() method:
  logger.log({
    level: 'info',
    message: `New addition operation requested: ${num1} + ${num2} = ${result}`,
  });

  res.send(`Result: ${result}`);
});

// Subtraction route
app.get('/subtract', (req, res) => {
  const { num1, num2 } = req.query;

  if (!isValidNumber(num1) || !isValidNumber(num2)) {
    logger.error('Invalid numbers provided for subtraction');
    return res.status(400).send('Please provide valid numbers.');
  }

  const result = Number(num1) - Number(num2);
  logger.log({
    level: 'info',
    message: `New subtraction operation requested: ${num1} - ${num2} = ${result}`,
  });

  res.send(`Result: ${result}`);
});

// Multiplication route
app.get('/multiply', (req, res) => {
  const { num1, num2 } = req.query;

  if (!isValidNumber(num1) || !isValidNumber(num2)) {
    logger.error('Invalid numbers provided for multiplication');
    return res.status(400).send('Please provide valid numbers.');
  }

  const result = Number(num1) * Number(num2);
  logger.log({
    level: 'info',
    message: `New multiplication operation requested: ${num1} * ${num2} = ${result}`,
  });

  res.send(`Result: ${result}`);
});

// Division route
app.get('/divide', (req, res) => {
  const { num1, num2 } = req.query;

  if (!isValidNumber(num1) || !isValidNumber(num2)) {
    logger.error('Invalid numbers provided for division');
    return res.status(400).send('Please provide valid numbers.');
  }

  if (Number(num2) === 0) {
    logger.error('Attempted division by zero');
    return res.status(400).send('Cannot divide by zero.');
  }

  const result = Number(num1) / Number(num2);
  logger.log({
    level: 'info',
    message: `New division operation requested: ${num1} / ${num2} = ${result}`,
  });

  res.send(`Result: ${result}`);
});

// Start server
app.listen(port, () => {
  logger.info(`Microservice running at http://localhost:${port}`);
});

