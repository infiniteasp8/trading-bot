// config/config.js
require("dotenv").config();

function isMarketOpen() {
  const now = new Date("");
  const day = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  // console.log(day);

  // Market is closed on Saturday (6) and Sunday (0)
  if (day === 0 || day === 6) {
    return false;
  }

  // Market hours are 9:15 AM to 3:30 PM IST
  const openHour = 9;
  const openMinute = 15;
  const closeHour = 15;
  const closeMinute = 30;

  if (
    (hours > openHour || (hours === openHour && minutes >= openMinute)) &&
    (hours < closeHour || (hours === closeHour && minutes < closeMinute))
  ) {
    return true;
  }

  return false;
};


module.exports = {
  finnhub: {
    apiKey: process.env.FINNHUB_API_KEY,
    baseUrl: "https://finnhub.io/api/v1",
  },
  trading: {
    defaultStocks: ["AAPL", "GOOGL", "MSFT", "AMZN", "NVDA", "MA", "JPM"], // we can add more stock symbols or we can make it dynamic more as
    balance: 10000, // Starting balance for trading
    strategy: "movingAverage", // Default trading strategy, change here for momentum type stragtegy
    marketOpen: true, // Indicates whether the market is open or not
  },
};
