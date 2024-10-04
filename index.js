// index.js
const express = require('express');
const { trade } = require('./controllers/tradingBot');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Trading Bot is running');
});

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
  trade(); // Initiate trading logic when the server starts
});
