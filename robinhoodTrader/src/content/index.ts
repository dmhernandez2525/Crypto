import "regenerator-runtime/runtime";
import { ITradingData } from "../interfaces";
console.log("Hey, the content script is running!");

// ==========================
// Get Data
// ==========================
import { getCurrentPrice } from "./getData";

// ==========================
// Trading Algorithms
// ==========================
import {
  runAllTradingAlgos,
  missedTradeDefualtInfo,
} from "./tradingAlgorithms";

// ==========================
// Data Management
// ==========================
import { setData, getData } from "./dataManagement";

const doRegularLoop = async (): Promise<void> => {
  // Display the current price
  console.log(getCurrentPrice());

  const { tradingData } = await getData();
  const { newTradingData } = await runAllTradingAlgos(tradingData);

  setData("tradingData", newTradingData);
};

const resetData = () => {
  const tradingData: ITradingData = {
    shortTerm: {
      Tier1: {
        sellAt: 0,
        buyAt: 1,
        boughtAt: 0,
        soldAt: 0,
        needToSell: false,
        needToBuy: true,
        tradeThreshold: 5,
        shouldReset: false,
        coinsBought: 0,
        currentPercentageHolding: 0,
        currentPercentageInvested: 0,
        trades: { buys: {}, sells: {} },
        allMissedTrades: missedTradeDefualtInfo,
        totalEquityGained: 0,
        totalEquityLost: 0,
      },
    },
  };

  setData("tradingData", tradingData);
  console.log({ resetDataAllData: tradingData });
};
// ==========================
// Main Loop
// ==========================
setTimeout(() => {
  console.log("Wait twenty seconds before running any code");
  setInterval(async () => {
    // await doRegularLoop();
    // resetData();
  }, 3000);
}, 20000);

// TODO: If the trade fails then this needs to track this

// Terms
// // Missed Trade:
// // Trading Threshold: the precent tat the trade needs to make to trigger a trade
// // // ex. tradingThreshold= 5%
