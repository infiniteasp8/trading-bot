// controllers/tradingBot.js
const { checkMarketStatus, getRealTimeStockData, getMockStockData } = require('../services/finnhubService');
const logger = require('../utils/logger');
const profitLoss = require('../utils/profitLoss');
const { TRADING_PARAMETERS } = require('../config/config');
// We can add more companies with our interests or some more dpeth logic
const symbolsToTrack = ['AAPL', 'GOOGL', 'MSFT'];

const trade = async () => {
  try {
    let isMarketOpen;
    try {
      isMarketOpen = await checkMarketStatus();
    } catch (error) {
      logger.error('Error checking market status. Assuming market is closed.');
      isMarketOpen = false;
    }

    let stockData;
    if (isMarketOpen) {
      logger.info('Market is open. Fetching real-time data from Finnhub API.');
      stockData = await getRealTimeStockData(symbolsToTrack);
    } else {
      logger.warn('Market is closed. Using mock data from local JSON file.');
      stockData = getMockStockData();
    }

    if (!stockData || !stockData.stocks || stockData.stocks.length === 0) {
      logger.error('Stock data is empty or not in expected format.');
      return;
    }

    executeTradingStrategy(stockData);
    profitLoss.printSummary();  // Print profit/loss summary at the end of trading session
  } catch (error) {
    logger.error(`Error executing trade: ${error.message}`);
  }
};

const executeTradingStrategy = (stockData) => {
  let currentBalance = stockData.initialBalance || TRADING_PARAMETERS.INITIAL_BALANCE;
  let stockHoldings = stockData.stockHoldings || [];

  stockData.stocks.forEach(stock => {
    const { symbol, prices } = stock;
    if (!prices || prices.length === 0) {
      logger.warn(`No price data available for ${symbol}. Skipping.`);
      return;
    }

    const latestPrice = prices[prices.length - 1].price;

    // Buy Condition: Buy if price is below the BUY_THRESHOLD and balance is sufficient
    if (latestPrice < TRADING_PARAMETERS.BUY_THRESHOLD && currentBalance >= latestPrice * 10) {
      logger.info(`Buying 10 shares of ${symbol} at $${latestPrice}`);
      stockHoldings.push({ symbol, quantity: 10, purchasePrice: latestPrice });
      const cost = latestPrice * 10;
      currentBalance -= cost;
      profitLoss.updateBalance(-cost);
      profitLoss.logTrade(symbol, 'BUY', 10, latestPrice);
    }

    // Sell Condition: Sell if price exceeds purchase price by SELL_THRESHOLD
    const holding = stockHoldings.find(h => h.symbol === symbol);
    if (holding && holding.purchasePrice * TRADING_PARAMETERS.SELL_THRESHOLD < latestPrice) {
      logger.info(`Selling 10 shares of ${symbol} at $${latestPrice}`);
      const revenue = latestPrice * holding.quantity;
      currentBalance += revenue;
      stockHoldings = stockHoldings.filter(h => h.symbol !== symbol);
      const profit = revenue - (holding.purchasePrice * holding.quantity);
      profitLoss.updateBalance(revenue);
      profitLoss.logTrade(symbol, 'SELL', holding.quantity, latestPrice, profit);
    }
  });
};

// Export the trade function
module.exports = { trade };
