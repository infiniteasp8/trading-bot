// services/finnhubService.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { API_KEY, BASE_URL } = require('../config/config');
const logger = require('../utils/logger');

// File path for mock data
const mockDataFilePath = path.join(__dirname, '../data/marketData.json');

// Check if the market is open using Finnhub API
const checkMarketStatus = async () => {
  try {
    const response = await axios.get(`${BASE_URL}market/status?token=${API_KEY}`);
    return response.data.marketStatus === 'open';
  } catch (error) {
    logger.error('Error checking market status. Assuming market is closed.', error.message);
    return false;
  }
};

// Get real-time stock data from Finnhub API
const getRealTimeStockData = async (symbols) => {
  try {
    const stockData = { stocks: [] };
    for (const symbol of symbols) {
      const response = await axios.get(`${BASE_URL}quote?symbol=${symbol}&token=${API_KEY}`);
      stockData.stocks.push({ symbol, prices: [{ price: response.data.c }] });
    }
    return stockData;
  } catch (error) {
    logger.error('Error fetching real-time stock data:', error.message);
    throw new Error('Failed to fetch real-time stock data');
  }
};

// Get mock stock data from local JSON file
const getMockStockData = () => {
  const rawData = fs.readFileSync(mockDataFilePath, 'utf-8');
  return JSON.parse(rawData);
};

module.exports = {
  checkMarketStatus,
  getRealTimeStockData,
  getMockStockData
};
