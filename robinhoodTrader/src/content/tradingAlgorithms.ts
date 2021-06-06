import {
  ITradingData,
  ITradeInfo,
  trades,
  allMissedTrades,
} from "../interfaces";
interface ITradingAlgoProps {
  currentPrice: number;
  tradingData: ITradingData;
}

interface ISelections {
  currentPercentageHolding?: number;
  currentPercentageInvested?: number;
  totalEquityLost?: number;
  totalEquityGained?: number;
  trades?: trades;
  needToSell?: boolean;
  needToBuy?: boolean;
  allMissedTrades?: allMissedTrades;
  shouldReset?: boolean;
  buyAt?: number;
  sellAt?: number;
  boughtAt?: number;
  soldAt?: number;
  coinsBought?: number;
  tradeThreshold?: number;
}

type ShortTermData = { [key: string]: ISelections };
type TradeData = { [key: string]: number };

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
export const runHoldTradingAlgo = ({
  currentPrice,
  tradingData,
}: ITradingAlgoProps) => {
  const holdSells = {};

  const holdBuys = {};
  const newData = { ...tradingData };

  // DO some check and update buys / sells
  // update tradingData

  return { holdSells, holdBuys, newData };
};

// TODO: GET THIS WORKING
export const runMainTradingAlgo = ({
  currentPrice,
  tradingData,
}: ITradingAlgoProps) => {
  const mainSells = {};

  const mainBuys = {};
  const newData = { ...tradingData };

  // DO some check and update buys / sells
  // update tradingData

  return { mainSells, mainBuys, newData };
};

// TODO: GET THIS WORKING

export const runShortTermTradingAlgo = ({
  currentPrice,
  tradingData,
}: ITradingAlgoProps) => {
  const shortTermSells: TradeData = {};
  const shortTermBuys: TradeData = {};

  const newShortTermData: ShortTermData = {};
  const currentEquity = getCurrentEquity();
  const currentBuyingPower = getCurrentBuyingPower();

  const tiers = ["Tier1"];
  // JJ-Note Possible improvement here with time complexity
  tiers.forEach((tier) => {
    let {
      sellAt,
      buyAt,
      boughtAt,
      soldAt,
      needToSell,
      needToBuy,
      tradeThreshold,
      shouldReset,
      coinsBought,
      trades,
      allMissedTrades,
      totalEquityGained,
      totalEquityLost,
    } = tradingData.shortTerm[tier];

    let { currentMissedTradesCount } = allMissedTrades;

    const selections: ISelections = {};
    let whatToDo: string = "";
    let tradeInfo: ITradeInfo = {
      id: `${Date.now()} shortTerm ${tier} at price ${currentPrice}`,
      currentPrice,
    };
    // JJ-Note Trades is defined above so depending on logic or when functions called; Makes sense
    // For some reason if you don't make a copy the original gets updated
    let newCurrentMissedTrades = parseInt(currentMissedTradesCount.toString());
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
      const amountMade = currentPrice - boughtAt;

      tradeInfo = { ...tradeInfo, type: "Sell" };
      currentTrades[tradeInfo.id] = tradeInfo;

      selections["currentPercentageHolding"] = 0;
      selections["currentPercentageInvested"] = 5;
      selections["trades"] = currentTrades;
      selections["needToSell"] = false;
      selections["needToBuy"] = true;
      // TODO: this needs to be updated to work with the new schema
      // selections["currentMissedTrades"] = 0;
      // selections["allMissedTrades"] = {};

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
      newShortTermData[tier] = {
        ...tradingData.shortTerm[tier],
        ...selections,
      };
      shortTermSells[`shortTerm${tier}`] = coinsBought * currentPrice;
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
      selections["coinsBought"] = amountUsdToBuy / currentPrice;
      // TODO: this needs to be updated to work with the new schema
      // selections["currentMissedTrades"] = 0;
      // selections["allMissedTrades"] = {};
      selections["shouldReset"] = false;

      newShortTermData[tier] = {
        ...tradingData.shortTerm[tier],
        ...selections,
      };

      shortTermBuys[`shortTerm${tier}`] = amountUsdToBuy;
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
        // TODO: this needs to be updated to work with the new schema
        // missedTrades;
        // currentIndex;
        // currentMissedTradesCount;
        // selections["currentMissedTrades"] = 0;
        // selections["allMissedTrades"] = {};
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
          tradeThreshold,
          currentPrice,
          tradeInfo,
          missedTradeInfo,
        });

        if (missedTrade) {
          // THIS NEEDS TO BE FIXED
          // THE types are all off
          // TODO: this needs to be updated to work with the new schema
          // selections["currentMissedTrades"] = newCurrentMissedTrades + 1;
          currentAllMissedTrades[tradeInfo.id] = tradeInfo;
          selections["allMissedTrades"] = currentAllMissedTrades;
        }
      }
      if (newCurrentMissedTrades !== 5 && needToBuy) {
        const { currentMissedTradeInfo, missedTrade } = buyMissedTrade({
          boughtAt,
          tradeThreshold,
          currentPrice,
          tradeInfo,
          missedTradeInfo,
        });
      }

      newShortTermData[tier] = {
        ...tradingData.shortTerm[tier],
        ...selections,
      };
    }
  });

  return { shortTermSells, shortTermBuys, newShortTermData };
};

// TODO: GET THIS WORKING
export const runAllTradingAlgos = async (tradingData: ITradingData) => {
  let newData = JSON.parse(JSON.stringify(tradingData));
  let currentPrice = getCurrentPrice();

  // TODO:
  // Step 1: look at tradingData and make any buys / sells that are necessary
  // Step 2: Update newData with all the changes from Step 1
  const { holdSells, holdBuys } = runHoldTradingAlgo({
    currentPrice,
    tradingData,
  });
  const { mainSells, mainBuys } = runMainTradingAlgo({
    currentPrice,
    tradingData,
  });
  const { shortTermSells, shortTermBuys, newShortTermData } =
    runShortTermTradingAlgo({
      currentPrice,
      tradingData,
    });

  // TODO: WE need to add all of the bu and sell together so we are onlyy doing 2 transations
  type tradeAmounts = {
    [key: string]: number;
  };
  let sells: tradeAmounts = {
    ...holdSells,
    ...mainSells,
    ...shortTermSells,
  };
  let buys: tradeAmounts = {
    ...holdBuys,
    ...mainBuys,
    ...shortTermBuys,
  };

  // Make sells / buys based on the algos output
  // amount should always be a number
  const callSell = async () => {
    for (let amount of Object.values(sells)) {
      console.log({ amount });
      await handleSellLogic(amount);
    }
  };
  const callBuy = async () => {
    for (let amount of Object.values(buys)) {
      console.log({ amount });
      await handleBuyLogic(amount);
    }
  };

  await callSell();
  await callBuy();
  newData.shortTerm = newShortTermData;
  return { newData };
};
