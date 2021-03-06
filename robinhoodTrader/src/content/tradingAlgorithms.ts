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

const missedTradeDefualtValues = {
  isDone: false,
  bellowOrAtDown: false,
  betwenDownAndBase: false,
  bellowOrAtUp: false,
  betwenUpAndBase: false,
};
export const missedTradeDefualtInfo: allMissedTrades = {
  missedTrades: {
    first: missedTradeDefualtValues,
  },
  currentIndex: "first",
  currentMissedTradesCount: 0,
};

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
  const newTradingData = { ...tradingData };

  // DO some check and update buys / sells
  // update tradingData

  return { holdSells, holdBuys, newTradingData };
};

// TODO: GET THIS WORKING
export const runMainTradingAlgo = ({
  currentPrice,
  tradingData,
}: ITradingAlgoProps) => {
  const mainSells = {};

  const mainBuys = {};
  const newTradingData = { ...tradingData };

  // DO some check and update buys / sells
  // update tradingData

  return { mainSells, mainBuys, newTradingData };
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
    const {
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

    const { currentMissedTradesCount } = allMissedTrades;

    const selections: ISelections = {};
    let whatToDo: string = "";
    let tradeInfo: ITradeInfo = {
      id: `${Date.now()} shortTerm ${tier} at price ${currentPrice}`,
      currentPrice,
    };
    // JJ-Note Trades is defined above so depending on logic or when functions called; Makes sense
    // For some reason if you don't make a copy the original gets updated
    const newCurrentMissedTrades = parseInt(
      currentMissedTradesCount.toString()
    );
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
      selections["allMissedTrades"] = missedTradeDefualtInfo;
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
      selections["allMissedTrades"] = missedTradeDefualtInfo;
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

      const missedTradeIndexing: string[] = [
        "first",
        "second",
        "third",
        "fourth",
        "fifth",
      ];

      const indexName = missedTradeIndexing[newCurrentMissedTrades];

      if (newCurrentMissedTrades === 5) {
        // - If the currentMissedTrades is at 5 then it needs to hold and set the
        //   next trade to reset

        selections["shouldReset"] = true;
        selections["allMissedTrades"] = missedTradeDefualtInfo;
      }

      if (newCurrentMissedTrades !== 5 && needToSell) {
        // additional logic to check that it doesn't just add the first 5
        // trades but instead tracks each missed trade at the correct proamitors

        const currentAllMissedTrades: allMissedTrades = JSON.parse(
          JSON.stringify(allMissedTrades)
        );

        const { currentMissedTradeInfo, missedTrade } = sellMissedTrade({
          soldAt,
          tradeThreshold,
          currentPrice,
          tradeInfo,
          missedTradeInfo: currentAllMissedTrades,
          indexName,
        });

        if (missedTrade) {
          // TODO: dubble check that this is all working

          currentAllMissedTrades.currentMissedTradesCount =
            newCurrentMissedTrades + 1;

          selections["allMissedTrades"] = currentMissedTradeInfo;
        }
      }

      if (newCurrentMissedTrades !== 5 && needToBuy) {
        // TODO: dry this code up most of this is exactly the same as the code above
        // TODO: dubble check that this is all working
        const currentAllMissedTrades: allMissedTrades = JSON.parse(
          JSON.stringify(allMissedTrades)
        );

        const { currentMissedTradeInfo, missedTrade } = buyMissedTrade({
          boughtAt,
          tradeThreshold,
          currentPrice,
          tradeInfo,
          missedTradeInfo: currentAllMissedTrades,
          indexName,
        });

        if (missedTrade) {
          currentAllMissedTrades.currentMissedTradesCount =
            newCurrentMissedTrades + 1;

          selections["allMissedTrades"] = currentMissedTradeInfo;
        }
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
  const newTradingData = JSON.parse(JSON.stringify(tradingData));
  const currentPrice: number | null = getCurrentPrice();

  if (currentPrice !== null) {
    // TODO:
    // Step 1: look at tradingData and make any buys / sells that are necessary
    // Step 2: Update newTradingData with all the changes from Step 1
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
    const sells: tradeAmounts = {
      ...holdSells,
      ...mainSells,
      ...shortTermSells,
    };
    const buys: tradeAmounts = {
      ...holdBuys,
      ...mainBuys,
      ...shortTermBuys,
    };

    // Make sells / buys based on the algos output
    // amount should always be a number

    // We can probibly subtract the buy and ell amounts and only do one sell
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
    newTradingData.shortTerm = newShortTermData;
  }

  return { newTradingData };
};
