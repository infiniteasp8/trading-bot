// strategies/movingAverage.js
// Placeholder for moving average strategy
module.exports = {
  calculateMovingAverage: (prices, period) => {
    const sum = prices.slice(-period).reduce((acc, price) => acc + price, 0);
    return sum / period;
  }
};
