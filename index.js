// index.js
const { tradeMultipleStocks } = require('./controllers/tradingBot');
const config = require('./config/config');

// Start the trading bot with a check for market status
(async () => {
  console.log(`Starting Trading Bot with strategy: ${config.trading.strategy}`);

  if (config.trading.marketOpen) {
    console.log('Market is open. Starting to trade...');
    await tradeMultipleStocks();
  } else {
    console.log('Market is closed. No trading activity will occur.');
  }
})();
