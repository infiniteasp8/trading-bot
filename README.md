**Trading Bot Documentation**

**Overview**             
This trading bot application simulates a basic trading bot for a hypothetical stock market. It is built using Node.js and integrates the Finnhub API for real-time (or mock) stock data. The bot makes trading decisions based on predefined strategies, tracks profit/loss, and monitors market status.

The bot supports multiple stocks and uses a logging system to track performance metrics, trade actions, and stock price updates. It also provides market open/closed status checks and prevents trading under specific conditions (e.g., zero balance, no stock holdings).

**Application Architecture**
The trading bot application consists of the following components:

Server Setup:
Sets up a basic Express server to run the trading bot services.
Exposes routes to start trading, view profit/loss, and view the bot’s status.
Controllers:

tradingBot.js: Contains the core trading logic, including buy/sell strategies, profit/loss tracking, and market status handling.
Services:

finnhubService.js: Interfaces with the Finnhub API to fetch real-time (or mock) stock data.
Strategies:

movingAverage.js: Implements a simple Moving Average strategy for buy/sell decisions.
momentum.js: Implements a basic Momentum strategy for trade actions.
Utilities:

logger.js: Provides logging capabilities using winston for tracking events, errors, and performance metrics.
Configurations:

config.js: Central configuration file for API keys, stock symbols, trading strategies, and market status.

**Trading Logic**
The trading bot uses two main strategies:

**Moving Average Crossover Strategy:**

The bot calculates a short-term moving average and a long-term moving average.
Buy Condition: When the short-term moving average crosses above the long-term moving average, indicating an uptrend.
Sell Condition: When the short-term moving average crosses below the long-term moving average, indicating a downtrend.

**Momentum Strategy**
The bot monitors the percentage change in stock prices.
Buy Condition: When the stock price drops by a certain percentage (e.g., 2%).
Sell Condition: When the stock price increases by a certain percentage (e.g., 3%).

**Market Status**
The bot checks whether the market is open or closed before executing any trades.
If the market is closed, the bot skips trading for that time period, and a warning message is logged.

**Profit/Loss Tracking**
The bot tracks profit and loss based on the buy/sell actions it performs.
It calculates profit/loss by comparing the total balance and the value of current stock holdings with the initial balance.

**Finnhub API**
The application uses the Finnhub API to fetch real-time stock data, which is necessary for executing trading strategies. Here's a brief overview of the API interaction:

API Key: Stored in config.js as finnhubApiKey. Make sure to include your own Finnhub API key here.
Stock Symbols: The bot monitors predefined stock symbols listed in config.js. You can modify or add more symbols as needed.
Data Fetching: finnhubService.js is responsible for fetching the latest stock prices using finnhub.io’s stock candles endpoint.

**Running the Application for Multiple Stocks**
The bot can monitor and trade multiple stock symbols simultaneously. To add more stocks:
We can simply 
