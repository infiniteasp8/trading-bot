// utils/profitLoss.js
const logger = require('./logger');

// Store the initial values
let initialBalance = 10000;  // Initial investment amount
let currentBalance = initialBalance;  // Track the current balance
let totalProfitLoss = 0;  // Track total profit/loss
let trades = [];  // Store trade details

// Function to log profit or loss
const logTrade = (symbol, action, quantity, price, profitLoss = 0) => {
  trades.push({
    symbol,
    action,
    quantity,
    price,
    profitLoss,
    date: new Date().toISOString()
  });

  totalProfitLoss += profitLoss;
  logger.info(`Trade Executed - Symbol: ${symbol}, Action: ${action}, Quantity: ${quantity}, Price: ${price}, Profit/Loss: ${profitLoss}`);
};

// Function to print the final profit/loss summary
const printSummary = () => {
  logger.info(`Final Balance: $${currentBalance}`);
  logger.info(`Total Profit/Loss: $${totalProfitLoss}`);
  logger.info('Detailed Trade Summary:');
  trades.forEach((trade) => {
    logger.info(`Trade on ${trade.date} - ${trade.action} ${trade.quantity} shares of ${trade.symbol} at $${trade.price}, Profit/Loss: $${trade.profitLoss}`);
  });
};

module.exports = {
  logTrade,
  printSummary,
  setInitialBalance: (balance) => { initialBalance = balance; currentBalance = balance; },
  updateBalance: (amount) => { currentBalance += amount; }
};
