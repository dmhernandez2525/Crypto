const buyMissedTrade = ({
  boughtAt,
  tradingThreshold,
  currentValue,
  tradeInfo,
  missedTradeInfo,
}) => {
  // This needs to deside if it should set the
  // current trade as a Missed Trade or not

  let currentMissedTradeInfo = JSON.parse(JSON.stringify(missedTradeInfo));
  let missedTrade = false;

  boughtAt = 100;
  let tradingThresholdValue = boughtAt * (tradingThreshold / 100); // => 5

  let down = boughtAt - tradingThresholdValue;

  // If currentValue is less then down then we need to track that
  if (currentValue < down && !currentMissedTradeInfo.bellowOrAtDown) {
    currentMissedTradeInfo.bellowOrAtDown = tradeInfo;
  } else if (currentValue > down && currentMissedTradeInfo.bellowOrAtDown) {
    // When these 2 values are enterd then this is a missedTrade

    currentMissedTradeInfo.betwenDownAndBase = tradeInfo;
    missedTrade = true;
  }

  return {
    currentMissedTradeInfo,
    missedTrade,
  };
};

const sellMissedTrade = ({
  boughtAt,
  tradingThreshold,
  currentValue,
  tradeInfo,
  missedTradeInfo,
}) => {
  // This needs to deside if it should set the
  // current trade as a Missed Trade or not

  let currentMissedTradeInfo = JSON.parse(JSON.stringify(missedTradeInfo));
  let missedTrade = false;

  // ex. tradingThreshold= 5% boughtAt = 100
  let tradingThresholdValue = boughtAt * (tradingThreshold / 100); // => 5

  let up = boughtAt + tradingThresholdValue;

  // If currentValue is more then up then we need to track that
  if (currentValue < up && !currentMissedTradeInfo.bellowOrAtUp) {
    currentMissedTradeInfo.bellowOrAtUp = tradeInfo;
  } else if (currentValue > up && currentMissedTradeInfo.bellowOrAtUp) {
    // When these 2 values are enterd then this is a missedTrade
    currentMissedTradeInfo.betwenUpAndBase = tradeInfo;
    missedTrade = true;
  }

  return {
    currentMissedTradeInfo,
    missedTrade,
  };
};

const holdAlgo = ({
  needToSell,
  needToBuy,
  boughtAt,
  tradingThreshold,
  currentValue,
  tradeInfo,
  missedTradeInfo,
}) => {
  if (needToSell) {
    const { currentMissedTradeInfo, missedTrade } = sellMissedTrade();
  }
  if (needToBuy) {
    const { currentMissedTradeInfo, missedTrade } = buyMissedTrade({
      boughtAt,
      tradingThreshold,
      currentValue,
      tradeInfo,
      missedTradeInfo,
    });
  }
};

holdAlgo({
  needToSell: false,
  needToBuy: true,
  boughtAt: 100,
  tradingThreshold: 5,
  currentValue: 94,
  tradeInfo: { hi: 1 },
  missedTradeInfo: {
    bellowOrAtDown: false,
    betwenDownAndBase: false,
    bellowOrAtUp: false,
    betwenUpAndBase: false,
  },
});
