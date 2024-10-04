// services/finnhubService.js
const axios = require('axios');
const config = require('../config/config');

// Fetch stock price data from Finnhub API
async function fetchStockPrice(symbol) {
  const url = `${config.finnhub.baseUrl}/quote?symbol=${symbol}&token=${config.finnhub.apiKey}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching stock price data for ${symbol}:`, error.message);
    throw error;
  }
}

module.exports = {
  fetchStockPrice,
};
