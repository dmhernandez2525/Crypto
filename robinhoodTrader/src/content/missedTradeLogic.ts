interface IBuyMissedTradeProps {
  boughtAt: number;
  tradeThreshold: number;
  currentPrice: number;
  tradeInfo: any;
  missedTradeInfo: any;
}
interface ISellMissedTradeProps {
  soldAt: number;
  tradeThreshold: number;
  currentPrice: number;
  tradeInfo: any;
  missedTradeInfo: any;
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

  let currentMissedTradeInfo = JSON.parse(JSON.stringify(missedTradeInfo));
  let missedTrade = false;

  let tradeThresholdValue = boughtAt * (tradeThreshold / 100); // => 5

  let down = boughtAt - tradeThresholdValue;

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

  let currentMissedTradeInfo = JSON.parse(JSON.stringify(missedTradeInfo));
  let missedTrade = false;

  let tradeThresholdValue = soldAt * (tradeThreshold / 100); // => 5

  let up = soldAt + tradeThresholdValue;

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
