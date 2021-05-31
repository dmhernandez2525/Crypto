// ==========================
// Get Data
// ==========================
import {
  getCurrentEquity,
  getCurrentPrice,
  getCurrentBuyingPower,
} from "./getData";

// ==========================
// Large Interactions
// ==========================
import { handleSellLogic, handleBuyLogic } from "./largeInteractions";

// ==========================
// Missed Trade Logic
// ==========================
import { buyMissedTrade, sellMissedTrade } from "./missedTradeLogic";

// TODO: GET THIS WORKING
export const runHoldTradingAlgo = (currentPrice, data) => {
  const holdSells = {};

  const holdBuys = {};
  const newData = { ...data };

  // DO some check and update buys / sells
  // update data

  return { holdSells, holdBuys, newData };
};

// TODO: GET THIS WORKING
export const runMainTradingAlgo = (currentPrice, data) => {
  const mainSells = {};

  const mainBuys = {};
  const newData = { ...data };

  // DO some check and update buys / sells
  // update data

  return { mainSells, mainBuys, newData };
};

// TODO: GET THIS WORKING
export const runMicroTradingAlgo = (currentPrice, data) => {
  const microSells = {};
  const microBuys = {};

  const newMicroData = {};
  const currentEquity = getCurrentEquity();
  const currentBuyingPower = getCurrentBuyingPower();

  const tiers = ["Tier1"];
  // JJ-Note Possible improvement here with time complexity
  tiers.forEach((tier) => {
    let {
      sellAt,
      buyAt,
      boughtAt,
      needToSell,
      needToBuy,
      tradeThreshold,
      shouldReset,
      coinsBought,
      trades,
      currentMissedTrades,
      allMissedTrades,
      totalEquityGained,
      totalEquityLost,
    } = data.Micro[tier];

    const selections = {};
    let whatToDo = false;
    let tradeInfo = {
      id: `${Date.now()} micro ${tier} at price ${currentPrice}`,
      currentPrice,
    };
    // JJ-Note Trades is defined above so depending on logic or when functions called; Makes sense
    // For some reason if you don't make a copy the original gets updated
    let newCurrentMissedTrades = parseInt(currentMissedTrades.toString());
    const currentTrades = JSON.parse(JSON.stringify(trades));
    const renameMe = currentPrice * (tradeThreshold / 100);

    // Checks if sell , buy or hold is what we should do
    if (shouldReset) {
      whatToDo = "sell";
    } else if (needToSell && currentPrice >= sellAt) {
      whatToDo = "sell";
    } else if (needToBuy && currentPrice <= buyAt) {
      whatToDo = "buy";
    } else {
      whatToDo = "hold";
    }

    if (whatToDo === "sell") {
      // TODO: fix this so that it calculating the correct value
      const amountMade = currentPrice - boughtAt;

      tradeInfo = { ...tradeInfo, type: "Sell" };
      currentTrades[tradeInfo.id] = tradeInfo;

      selections["currentPercentageHolding"] = 0;
      selections["currentPercentageInvested"] = 5;
      selections["trades"] = currentTrades;
      selections["needToSell"] = false;
      selections["needToBuy"] = true;
      selections["currentMissedTrades"] = 0;
      selections["allMissedTrades"] = {};
      selections["shouldReset"] = false;
      selections["buyAt"] = currentPrice - renameMe;
      selections["soldAt"] = currentPrice;
      selections["coinsBought"] = 0;

      if (shouldReset) {
        // TODO: double check this
        selections["totalEquityLost"] = totalEquityLost + -amountMade;
      } else {
        selections["totalEquityGained"] = totalEquityGained + amountMade;
      }
      newMicroData[tier] = {
        ...data.Micro[tier],
        ...selections,
      };
      microSells[`Micro${tier}`] = coinsBought * currentPrice;
    } else if (whatToDo === "buy") {
      // TODO: ADD MORE INFO FOR THE TRADES
      tradeInfo = { ...tradeInfo, type: "Buy" };
      currentTrades[tradeInfo.id] = tradeInfo;

      const amountUsdToBuy =
        (currentEquity + currentBuyingPower) * (tradeThreshold / 100);

      // TODO: fix this
      selections["currentPercentageInvested"] = 0;
      selections["currentPercentageHolding"] = tradeThreshold;
      selections["trades"] = currentTrades;

      // TODO: Make sure this is working correctly
      selections["sellAt"] = currentPrice + renameMe;
      selections["boughtAt"] = currentPrice;
      selections["needToSell"] = true;
      selections["needToBuy"] = false;
      selections["coinsBought"] = parseInt(amountUsdToBuy / currentPrice);
      selections["currentMissedTrades"] = 0;
      selections["allMissedTrades"] = {};
      selections["shouldReset"] = false;

      newMicroData[tier] = {
        ...data.Micro[tier],
        ...selections,
      };

      microBuys[`Micro${tier}`] = amountUsdToBuy;
    } else if (whatToDo === "hold") {
      // We need to have a way to make a pair of values
      // ex.
      // missedTradeInfo {bellowOrAtDown:tradeInfo, betwenDownAndBase:tradeInfo  }
      // missedTradeInfo: {bellowOrAtDown:false, betwenDownAndBase:false  }
      // TODO: FIX THIS
      let missedTradeInfo = {
        bellowOrAtDown: false,
        betwenDownAndBase: false,
        bellowOrAtUp: false,
        betwenUpAndBase: false,
      };

      if (newCurrentMissedTrades === 5) {
        // TODO: this needs to be reassed
        // - If the currentMissedTrades is at 5 then it needs to hold and set the
        //   next trade to reset
        selections["shouldReset"] = true;
        selections["currentMissedTrades"] = 0;
        selections["allMissedTrades"] = {};
      }

      if (newCurrentMissedTrades !== 5 && needToSell) {
        // TODO:
        // - This needs additional logic so that it doesn't just add the first 5
        //   trades but instead tracks each missed trade at the correct proamitors
        const currentAllMissedTrades = JSON.parse(
          JSON.stringify(allMissedTrades)
        );

        const { currentMissedTradeInfo, missedTrade } = sellMissedTrade({
          soldAt,
          tradingThreshold,
          currentValue,
          tradeInfo,
          missedTradeInfo,
        });

        if (missedTrade) {
          // THIS NEEDS TO BE FIXED
          // THE types are all off
          selections["currentMissedTrades"] = newCurrentMissedTrades + 1;
          currentAllMissedTrades[tradeInfo.id] = tradeInfo;
          selections["allMissedTrades"] = currentAllMissedTrades;
        }
      }
      if (newCurrentMissedTrades !== 5 && needToBuy) {
        const { currentMissedTradeInfo, missedTrade } = buyMissedTrade({
          boughtAt,
          tradingThreshold,
          currentValue,
          tradeInfo,
          missedTradeInfo,
        });
      }

      newMicroData[tier] = {
        ...data.Micro[tier],
        ...selections,
      };
    }
  });

  return { microSells, microBuys, newMicroData };
};

// TODO: GET THIS WORKING
export const runAllTradingAlgos = async (data) => {
  let newData = JSON.parse(JSON.stringify(data));
  let currentPrice = getCurrentPrice();

  // TODO:
  // Step 1: look at data and make any buys / sells that are necessary
  // Step 2: Update newData with all the changes from Step 1
  const { holdSells, holdBuys } = runHoldTradingAlgo(currentPrice, data);
  const { mainSells, mainBuys } = runMainTradingAlgo(currentPrice, data);
  const { microSells, microBuys, newMicroData } = runMicroTradingAlgo(
    currentPrice,
    data
  );

  let sells = {
    ...holdSells,
    ...mainSells,
    ...microSells,
  };
  let buys = {
    ...holdBuys,
    ...mainBuys,
    ...microBuys,
  };

  // Make sells / buys based on the algos output
  // amount should always be a number
  Object.values(sells).forEach(async (amount) => {
    console.log({ amount });
    await handleSellLogic(amount);
  });
  Object.values(buys).forEach(async (amount) => {
    console.log({ amount });
    await handleBuyLogic(amount);
  });

  newData.Micro = newMicroData;
  return { newData };
};
