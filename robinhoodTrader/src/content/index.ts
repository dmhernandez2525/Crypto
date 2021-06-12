import "regenerator-runtime/runtime";

//Interfaces
import { ITradingData } from "../interfaces";

// Trading Algorithms
import {
  runAllTradingAlgos,
  missedTradeDefualtInfo,
} from "./tradingAlgorithms";

// Data Management
import { setData, getData } from "./dataManagement";

console.log("Hey, the content script is running!");

const doRegularLoop = async (): Promise<void> => {
  const { tradingData } = await getData();
  const { newTradingData, shouldReset } = await runAllTradingAlgos(tradingData);

  setData({ index: "tradingData", newTradingData, shouldReset });
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
        tradeThreshold: 0.1,
        percentAllowedToTrade: 30,
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

  setData({
    index: "tradingData",
    newTradingData: tradingData,
    shouldReset: false,
  });

  console.log({ resetDataAllData: tradingData });
};
// ==========================
// Main Loop
// ==========================
setTimeout(() => {
  console.log("Wait twenty seconds before running any code");

  setInterval(async () => {
    await doRegularLoop();

    // resetData();
  }, 3000);
}, 10000);

// TODO:
// - If the trade fails then this needs to track this
// - We need to track the miss trade thresholds
// -

// Terms
// // Missed Trade:
// // Trading Threshold: the precent tat the trade needs to make to trigger a trade
// // // ex. tradingThreshold= 5%
