// config/config.js
require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  API_KEY: process.env.FINNHUB_API_KEY,
  BASE_URL: 'https://finnhub.io/api/v1/',
  TRADING_PARAMETERS: {
    BUY_THRESHOLD: 150, // Example buy threshold for trading strategy
    SELL_THRESHOLD: 1.05, // Example sell threshold (5% gain)
    INITIAL_BALANCE: 10000 // Starting balance for the trading bot
  }
};
