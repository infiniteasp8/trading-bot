// strategies/momentum.js
/**
 * Momentum-based trading strategy.
 * Buys when the price increases by a certain percentage within a short period and sells when it decreases.
 */
function momentumStrategy(prices, threshold = 0.02) {
    const currentPrice = prices[prices.length - 1];
    const previousPrice = prices[prices.length - 2];
  
    const priceChange = (currentPrice - previousPrice) / previousPrice;
  
    if (priceChange > threshold) {
      return 'buy';
    } else if (priceChange < -threshold) {
      return 'sell';
    }
    return 'hold';
  }
  
  module.exports = {
    momentumStrategy,
  };
  