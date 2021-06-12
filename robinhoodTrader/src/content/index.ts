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

// Refresh Page
import { refreshPage } from "./refreshPage";

const doRegularLoop = async (counter: number): Promise<void> => {
  const { tradingData } = await getData();
  const { newTradingData, shouldReset } = await runAllTradingAlgos(tradingData);

  // TODO: This should be refactord when you have time
  //  - this is just to limmit the amount of logging that we are doing
  counter === 19 && console.log({ newTradingData });

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
        tradeThreshold: 0.05,
        percentAllowedToTrade: 40,
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
console.log("Hey, the content script is running!");
setTimeout(() => {
  console.log("Wait twenty seconds before running any code");
  let counter = 0;
  let timeInSec = 0;
  let timeInMin = 0;
  let timeInHours = 0;
  let intervalSpeed = 3000; // 3 sec
  setInterval(async () => {
    try {
      await doRegularLoop(counter);
      // resetData();
    } catch (error) {
      console.log("//=======================================>");
      console.log("THERE WAS AN ERROR IN WITH THE DO REGULAR LOOP");
      console.log({ error });
      console.log("//=======================================>");
      try {
        refreshPage();
      } catch (error) {
        console.log("//=======================================>");
        console.log("THERE WAS AN ERROR SOMETHING SERIOUS");
        console.log({ error });
        console.log("//=======================================>");
      }
    }

    counter += 1;
    if (counter === 500) {
      timeInSec += counter * (intervalSpeed / 1000);
      timeInMin += timeInSec / 60;
      timeInHours += timeInMin / 60;
      counter = 0;

      console.log({ timeInSec, timeInMin, timeInHours });
    }
  }, intervalSpeed);
}, 10000);

// TODO:
// - If the trade fails then this needs to track this
// - We need to track the miss trade thresholds
// -

// Terms
// // Missed Trade:
// // Trading Threshold: the precent tat the trade needs to make to trigger a trade
// // // ex. tradingThreshold= 5%
