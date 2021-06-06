import { ITradeInfo, allMissedTrades } from "../interfaces";

// TODO: combine these 2 interfaces
interface IBuyMissedTradeProps {
  boughtAt: number;
  tradeThreshold: number;
  currentPrice: number;
  tradeInfo: ITradeInfo;
  missedTradeInfo: allMissedTrades;
}
interface ISellMissedTradeProps {
  soldAt: number;
  tradeThreshold: number;
  currentPrice: number;
  tradeInfo: ITradeInfo;
  missedTradeInfo: allMissedTrades;
}

export const buyMissedTrade = ({
  boughtAt,
  tradeThreshold,
  currentPrice,
  tradeInfo,
  missedTradeInfo,
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
  if (currentPrice < down && !currentMissedTradeInfo.bellowOrAtDown) {
    currentMissedTradeInfo.bellowOrAtDown = tradeInfo;
  } else if (currentPrice > down && currentMissedTradeInfo.bellowOrAtDown) {
    // When these 2 values are enterd then this is a missedTrade

    currentMissedTradeInfo.betwenDownAndBase = tradeInfo;
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
}: ISellMissedTradeProps) => {
  // This needs to deside if it should set the
  // current trade as a Missed Trade or not

  let currentMissedTradeInfo: allMissedTrades = JSON.parse(
    JSON.stringify(missedTradeInfo)
  );
  let missedTrade = false;

  let tradeThresholdValue: number = soldAt * (tradeThreshold / 100); // => 5

  let up: number = soldAt + tradeThresholdValue;

  // If currentPrice is more then up then we need to track that
  if (currentPrice < up && !currentMissedTradeInfo.bellowOrAtUp) {
    currentMissedTradeInfo.bellowOrAtUp = tradeInfo;
  } else if (currentPrice > up && currentMissedTradeInfo.bellowOrAtUp) {
    // When these 2 values are enterd then this is a missedTrade
    currentMissedTradeInfo.betwenUpAndBase = tradeInfo;
    missedTrade = true;
  }

  return {
    currentMissedTradeInfo,
    missedTrade,
  };
};
