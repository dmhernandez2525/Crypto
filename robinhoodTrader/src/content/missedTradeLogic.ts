import { ITradeInfo, allMissedTrades } from "../interfaces";

interface IMissedTradeProps {
  tradeThreshold: number;
  currentPrice: number;
  tradeInfo: ITradeInfo;
  missedTradeInfo: allMissedTrades;
  indexName: string;
}
interface ISellMissedTradeProps extends IMissedTradeProps {
  soldAt: number;
}

interface IBuyMissedTradeProps extends IMissedTradeProps {
  boughtAt: number;
}

export const buyMissedTrade = ({
  boughtAt,
  tradeThreshold,
  currentPrice,
  tradeInfo,
  missedTradeInfo,
  indexName,
}: IBuyMissedTradeProps) => {
  // This needs to deside if it should set the
  // current trade as a Missed Trade or not

  let currentMissedTradeInfo: allMissedTrades = JSON.parse(
    JSON.stringify(missedTradeInfo)
  );
  let missedTrade: boolean = false;

  let tradeThresholdValue: number = boughtAt * (tradeThreshold / 100); // => 5

  let down: number = boughtAt - tradeThresholdValue;

  // If currentPrice is less then down then we need to track that
  if (
    currentPrice < down &&
    !currentMissedTradeInfo.missedTrades[indexName].bellowOrAtDown
  ) {
    currentMissedTradeInfo.missedTrades[indexName].bellowOrAtDown = tradeInfo;
  } else if (
    currentPrice > down &&
    currentMissedTradeInfo.missedTrades[indexName].bellowOrAtDown
  ) {
    // When these 2 values are enterd then this is a missedTrade

    currentMissedTradeInfo.missedTrades[indexName].betwenDownAndBase =
      tradeInfo;
    currentMissedTradeInfo.missedTrades[indexName].isDone = true;
    missedTrade = true;
  }

  return {
    currentMissedTradeInfo,
    missedTrade,
  };
};

export const sellMissedTrade = ({
  soldAt,
  tradeThreshold,
  currentPrice,
  tradeInfo,
  missedTradeInfo,
  indexName,
}: ISellMissedTradeProps) => {
  // additional logic to check that it doesn't just add the first 5
  // trades but instead tracks each missed trade at the correct proamitors
  // This needs to deside if it should set the
  // current trade as a Missed Trade or not

  let currentMissedTradeInfo: allMissedTrades = JSON.parse(
    JSON.stringify(missedTradeInfo)
  );
  let missedTrade = false;

  let tradeThresholdValue: number = soldAt * (tradeThreshold / 100); // => 5

  let up: number = soldAt + tradeThresholdValue;

  // If currentPrice is more then up then we need to track that
  if (
    currentPrice < up &&
    !currentMissedTradeInfo.missedTrades[indexName].bellowOrAtUp
  ) {
    currentMissedTradeInfo.missedTrades[indexName].bellowOrAtUp = tradeInfo;
  } else if (
    currentPrice > up &&
    currentMissedTradeInfo.missedTrades[indexName].bellowOrAtUp
  ) {
    // When these 2 values are enterd then this is a missedTrade
    currentMissedTradeInfo.missedTrades[indexName].betwenUpAndBase = tradeInfo;
    currentMissedTradeInfo.missedTrades[indexName].isDone = true;
    missedTrade = true;
  }

  return {
    currentMissedTradeInfo,
    missedTrade,
  };
};
