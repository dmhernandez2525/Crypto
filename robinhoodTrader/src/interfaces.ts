export interface ITradeInfo {
  id: string;
  currentPrice: number;
  //   This is refuring to if it is Buy, Sel, Or Hold
  type?: string;
}
export type trades = {
  // Key should be the trade id but this hould be revisited latter
  buys: {
    [key: string]: ITradeInfo;
  };
  sells: {
    [key: string]: ITradeInfo;
  };
};

// TODO: figure out how we are going to do this
// We need to have a way to make a pair of values
// ex.
// missedTradeInfo {bellowOrAtDown:tradeInfo, betwenDownAndBase:tradeInfo  }
// missedTradeInfo: {bellowOrAtDown:false, betwenDownAndBase:false  }
export type allMissedTrades = {
  missedTrades: {
    [key: string]: {
      isDone: boolean;
      bellowOrAtDown: boolean | ITradeInfo;
      betwenDownAndBase: boolean | ITradeInfo;
      bellowOrAtUp: boolean | ITradeInfo;
      betwenUpAndBase: boolean | ITradeInfo;
    };
  };
  currentIndex: string;
  currentMissedTradesCount: number;
};

export interface ITradingData {
  // TODO:BRING THISS BACK WHEN ALLL CURRENT ALGOS ARE WORKING
  //   threeTeir: {
  //     bet: number;
  //     base: number;
  //     hedge: number;
  //   };
  shortTerm: {
    [key: string]: {
      sellAt: number;
      buyAt: number;
      boughtAt: number;
      soldAt: number;
      needToSell: boolean;
      needToBuy: boolean;
      tradeThreshold: number;
      shouldReset: boolean;
      coinsBought: number;
      currentPercentageHolding: number;
      currentPercentageInvested: number;
      trades: trades;
      allMissedTrades: allMissedTrades;
      totalEquityGained: number;
      totalEquityLost: number;
    };
  };
}
