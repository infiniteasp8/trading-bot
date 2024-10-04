
const finnhubService = require('../services/finnhubService');
const { movingAverageStrategy } = require('../strategies/movingAverage');
const { momentumStrategy } = require('../strategies/momentum');
const config = require('../config/config');
const logger = require('../utils/logger'); // Import the custom logger

let balance = config.trading.balance;
let positions = {};
let profitLoss = 0;

// Function to check if the market is open or closed
function isMarketOpen() {
  return config.trading.marketOpen;
}

// Log profit/loss and performance metrics
function logPerformanceMetrics(symbol, price, action) {
  let currentProfitLoss = balance + (positions[symbol] || 0) * price - config.trading.balance;
  logger.infoLog(`Symbol: ${symbol} | Action: ${action} | Current Profit/Loss: ${currentProfitLoss.toFixed(2)}`);
  logger.infoLog(`Balance: ${balance.toFixed(2)} | Stock Positions: ${JSON.stringify(positions)}`);
}

// Simulate trades for a single stock symbol based on strategy
async function tradeStock(symbol, strategy = 'movingAverage') {
  if (!isMarketOpen()) {
    logger.warnLog(`Market is closed. No trading activity for ${symbol}`);
    return;
  }

  try {
    // Fetch the latest stock prices (mock data or real data)
    const stockData = await finnhubService.fetchStockPrice(symbol);
    const prices = [stockData.o, stockData.h, stockData.l, stockData.c]; // Open, High, Low, Close prices

    let action;
    switch (strategy) {
      case 'momentum':
        action = momentumStrategy(prices);
        break;
      case 'movingAverage':
      default:
        action = movingAverageStrategy(prices);
        break;
    }

    // Execute the trade based on the action
    if (action === 'buy') {
      buyStock(symbol, stockData.c);
    } else if (action === 'sell') {
      sellStock(symbol, stockData.c);
    } else {
      logger.infoLog(`Symbol: ${symbol} | No action needed, holding position`);
    }

    // Log performance metrics after every trade
    logPerformanceMetrics(symbol, stockData.c, action);

    
  } catch (error) {
    logger.errorLog(`Error trading stock ${symbol}: ${error.message}`);
  }
}

// Buy stock
function buyStock(symbol, price) {
  const quantity = balance / price;
  if (quantity > 0) {
    balance -= quantity * price;
    positions[symbol] = (positions[symbol] || 0) + quantity;
    logger.infoLog(`Bought ${quantity.toFixed(2)} units of ${symbol} at price ${price}`);
  } else {
    logger.warnLog(`Insufficient balance to buy ${symbol}`);
  }
}

// Sell stock
function sellStock(symbol, price) {
  const quantity = positions[symbol] || 0;
  if (quantity === 0) {
    logger.warnLog(`No stock holdings available to sell ${symbol}.`);
    return;
  }

  balance += quantity * price;
  positions[symbol] = 0;
  logger.infoLog(`Sold ${quantity.toFixed(2)} units of ${symbol} at price ${price}`);
}

// Monitor and trade multiple stocks
async function tradeMultipleStocks() {
  if (!isMarketOpen()) {
    logger.warnLog(`Market is currently closed. No trading activity will occur.`);
    return;
  }

  const stockSymbols = config.trading.defaultStocks;
  for (const symbol of stockSymbols) {
    await tradeStock(symbol, config.trading.strategy);
  }

  logger.infoLog('Final Balance:', balance.toFixed(2));
  logger.infoLog('Positions:', JSON.stringify(positions));
}

module.exports = {
  tradeMultipleStocks,
};
