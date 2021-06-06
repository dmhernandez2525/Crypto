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
import { runAllTradingAlgos } from "./tradingAlgorithms";

// ==========================
// Data Management
// ==========================
import { setData, getData } from "./dataManagement";

const doRegularLoop = async () => {
  // Display the current price
  console.log(getCurrentPrice());

  const { data } = await getData();
  const { newData } = await runAllTradingAlgos(data);

  setData("data", newData);
};

const resetData = () => {
  const allData: ITradingData = {
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
        allMissedTrades: {
          missedTrades: {},
          // TODO:Fix this at some point
          currentIndex: "None",
          currentMissedTradesCount: 0,
        },
        totalEquityGained: 0,
        totalEquityLost: 0,
      },
    },
  };

  setData("data", allData);
  console.log({ resetDataAllData: allData });
};
// ==========================
// Main Loop
// ==========================
setTimeout(() => {
  // Wait twenty seconds before running any code
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
