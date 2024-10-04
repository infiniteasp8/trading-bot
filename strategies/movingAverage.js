// strategies/movingAverage.js
/**
 * Moving average crossover strategy.
 * Buys when the price is lower than the short-term average and sells when the price is higher than the long-term average.
 */
function movingAverageStrategy(prices) {
    const shortTermAverage = calculateMovingAverage(prices, 5);
    const longTermAverage = calculateMovingAverage(prices, 20);
    const currentPrice = prices[prices.length - 1];
  
    if (currentPrice < shortTermAverage) {
      return 'buy';
    } else if (currentPrice > longTermAverage) {
      return 'sell';
    }
    return 'hold';
  }
  
  // Helper function to calculate the moving average
  function calculateMovingAverage(prices, period) {
    const sum = prices.slice(-period).reduce((acc, price) => acc + price, 0);
    return sum / period;
  }
  
  module.exports = {
    movingAverageStrategy,
  };
  