// ==========================
// Move Around On Site
// ==========================
const clickSellTab = () => {
  console.log("Move to the sell tab");

  document.querySelectorAll("[data-testid=OrderFormHeading-Sell]")[0].click();
  document.querySelectorAll("[data-testid=OrderForm]")[0].click();
};

const clickBuyTab = () => {
  console.log("Move to the buy tab");

  let divs = document.getElementsByTagName("div");
  let divContainer;

  for (let i = 0; i < divs.length; i++) {
    if (divs[i].outerText === "Buy DOGE") {
      divContainer = divs[i].firstChild.firstChild;
      // TODO fix this
      break;
    }
  }
  divContainer.click();
};

const clickSellType = () => {
  // This is referring to amount in USD or Doge type
  let spans = document.getElementsByTagName("span");
  let spanContainer;

  for (let i = 0; i < spans.length; i++) {
    if (spans[i].outerText === "Amount in") {
      spanContainer = spans[i].parentNode;
      break;
    }
  }
  spanContainer.click();
};

// ==========================
// Get Data
// ==========================
const getOrderTypes = () => {
  console.log("Click the order type button");
  document.querySelectorAll("[data-testid=MenuPopoverTrigger]")[0].click();

  let test = document
    .getElementsByClassName("card-heading")[1]
    .parentNode.querySelectorAll("a")
    .filter((e) => {});
  // TODO find a better way to do this

  let limit = test[0];
  let market = test[0];

  return { limit, market };
};

const getCurrentEquity = () => {
  let divs = document.getElementsByTagName("div");
  let divContainer;

  for (let i = 0; i < divs.length; i++) {
    if (divs[i].outerText === "Your Equity") {
      divContainer = divs[i].parentNode;
      break;
    }
  }

  const unformattedText = divContainer.querySelector("span").outerText;
  let formattedText = parseInt(unformattedText.split("$")[1]);

  return formattedText;
};

const getCurrentCoinAmount = () => {
  clickSellType();

  parseInt(
    document
      .querySelectorAll("[data-testid=OrderForm]")[0]
      .querySelector("footer")
      .textContent.split("DOGE Available")[0]
  );
};

const getCurrentPrice = () => {
  let priceArray = [];

  Array.from(
    document.querySelectorAll("[data-testid=PortfolioValue]")[0].children[0]
      .children[0].firstChild.firstChild.children
  ).forEach((ele) => priceArray.push(ele.innerText));

  return parseFloat(parseFloat(priceArray.join("").split("$")[1]).toFixed(3));
};

const getCurrentBuyingPower = () => {
  clickBuyTab();
  const currentBuyingPower = parseInt(
    document
      .querySelectorAll("[data-testid=OrderForm]")[0]
      .querySelector("footer")
      .firstChild.outerText.split(" available")[0]
      .split("$")[1]
  );
  const onePercent = currentBuyingPower / 100;

  return currentBuyingPower - onePercent;
};

// ==========================
// Interact With Site
// ==========================
const clickReviewButton = () => {
  console.log("Click the review button");
  document
    .querySelectorAll("[data-testid=OrderFormPrimaryButtonReview]")[0]
    .click();
};

const clickDoneButton = async () => {
  // Find the done button
  console.log("Find the done button");
  let spans = document.getElementsByTagName("span");
  let spanContainer;

  for (let i = 0; i < spans.length; i++) {
    if (spans[i].outerText === "Done") {
      spanContainer = spans[i].parentNode;
      break;
    }
  }
  // Click the done button
  console.log("Click the done button");
  console.log(spanContainer);
  await spanContainer.click();
};

const enterValue = (value) => {
  const input = document.querySelectorAll(
    "[data-testid=CryptoOrderFormRowsAmount]"
  )[0];

  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  ).set;
  nativeInputValueSetter.call(input, value);

  const inputEvent = new Event("input", { bubbles: true });
  input.dispatchEvent(inputEvent);
};

const handleSell = () => {
  console.log("Sell");
  document
    .querySelectorAll("[data-testid=OrderFormPrimaryButtonSubmit]")[0]
    .click();
};

const handleBuy = () => {
  console.log("Buy");
  document
    .querySelectorAll("[data-testid=OrderFormPrimaryButtonSubmit]")[0]
    .click();
};

// ==========================
// Large Interactions
// ==========================
const handleSellLogic = async (amount) => {
  //  Move to the sell tab
  clickSellTab();

  // Should allays be selling in terms of usd
  // Enter amount
  enterValue(amount);

  //   Click the review button
  clickReviewButton();

  await new Promise((resolve) => {
    setTimeout(() => {
      handleSell();
      setTimeout(() => {
        clickDoneButton();
        setTimeout(() => {
          clickDoneButton();
          resolve();
        }, 500);
      }, 1000);
    }, 500);
  });
};
const handleBuyLogic = async (amount) => {
  // amount should always be a number
  //  Move to the buy tab
  clickBuyTab();

  // Should allays be buying in terms of usd

  // Enter amount
  enterValue(amount);

  // Click the review button
  clickReviewButton();
  await new Promise((resolve) => {
    setTimeout(() => {
      handleBuy();
      setTimeout(() => {
        clickDoneButton();
        setTimeout(() => {
          clickDoneButton();
          resolve();
        }, 500);
      }, 1000);
    }, 500);
  });
};

// ==========================
// Trading Algorithms
// ==========================
// TODO: GET THIS WORKING
const runHoldTradingAlgo = (currentPrice, data) => {
  const holdSells = {};

  const holdBuys = {};
  const newData = { ...data };

  // DO some check and update buys / sells
  // update data

  return { holdSells, holdBuys, newData };
};

// TODO: GET THIS WORKING
const runMainTradingAlgo = (currentPrice, data) => {
  const mainSells = {};

  const mainBuys = {};
  const newData = { ...data };

  // DO some check and update buys / sells
  // update data

  return { mainSells, mainBuys, newData };
};
// TODO: GET THIS WORKING
const runMicroTradingAlgo = (currentPrice, data) => {
  const microSells = {};
  const microBuys = {};

  const newMicroData = {};
  const currentEquity = getCurrentEquity();
  const currentBuyingPower = getCurrentBuyingPower();

  const tiers = ["Tier1"];

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

    let whatToDo = false;
    const selections = {};
    let tradeInfo = {
      // TODO: make this random
      id: `${Date.now()} micro ${tier} at price ${currentPrice}`,
      currentPrice,
    };

    let currentMissedTrades2 = parseInt(currentMissedTrades.toString());
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

      const currentTrades = JSON.parse(JSON.stringify(trades));
      tradeInfo = { ...tradeInfo, type: "Sell" };
      currentTrades[tradeInfo.id] = tradeInfo;

      selections["currentPercentageHolding"] = 0;
      selections["currentPercentageInvested"] = 5;
      selections["trades"] = currentTrades;
      selections["needToSell"] = false;
      selections["needToBuy"] = true;
      selections["currentMissedTrades"] = 0;
      currentAllMissedTrades = {};
      selections["shouldReset"] = false;
      selections["buyAt"] =
        currentPrice - currentPrice * (tradeThreshold / 100);
      selections["soldAt"] = currentPrice;
      selections["coinsBought"] = 0;

      if (shouldReset) {
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
      //       - totalEquityGained
      // TODO: ADD MORE INFO FOR THE TRADES
      const currentTrades = JSON.parse(JSON.stringify(trades));
      tradeInfo = { ...tradeInfo, type: "Buy" };
      currentTrades[tradeInfo.id] = tradeInfo;
      // WHAT IS THIS DOING?
      const amountUsdToBuy = (currentEquity + currentBuyingPower) * 0.05;

      selections["currentPercentageHolding"] = 5;
      selections["currentPercentageInvested"] = 0;
      selections["trades"] = currentTrades;
      // TODO: Make sure this is working correctly
      selections["sellAt"] =
        currentPrice + currentPrice * (tradeThreshold / 100);
      selections["boughtAt"] = currentPrice;
      selections["needToSell"] = true;
      selections["needToBuy"] = false;
      selections["currentMissedTrades"] = 0;
      currentAllMissedTrades = {};
      selections["shouldReset"] = false;
      selections["coinsBought"] = parseInt(amountUsdToBuy / currentPrice);

      newMicroData[tier] = {
        ...data.Micro[tier],
        ...selections,
      };
      microBuys[`Micro${tier}`] = amountUsdToBuy;
    } else if (whatToDo === "hold") {
      // TODO:make this dynamic
      // If the currentMissedTrades is at 5 then it needs to hold and set the next trade to reset
      // This needs additional logic so that it doesn't just add the first 5 trades
      if (currentMissedTrades2 === 5) {
        selections["shouldReset"] = true;
        selections["currentMissedTrades"] = 0;
      } else {
        // TODO: need to workon buy and sell waite
        if (needToSell) {
          selections["currentMissedTrades"] = currentMissedTrades2 + 1;

          const currentAllMissedTrades = JSON.parse(
            JSON.stringify(allMissedTrades)
          );
          currentAllMissedTrades[tradeInfo.id] = tradeInfo;

          selections["allMissedTrades"] = currentAllMissedTrades;
        }
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
const runAllTradingAlgos = async (data) => {
  // TODO: Add Typescript

  let newData = JSON.parse(JSON.stringify(data));
  console.log({ newData });
  // TODO:
  // Step 1: look at data and make any buys / sells that are necessary
  // Step 2: Update newData with all the changes from Step 1

  let currentPrice = getCurrentPrice();

  const { holdSells, holdBuys } = runHoldTradingAlgo(currentPrice, data);
  const { mainSells, mainBuys } = runMainTradingAlgo(currentPrice, data);
  const { microSells, microBuys, newMicroData } = runMicroTradingAlgo(
    currentPrice,
    data
  );

  let sells = {
    // ex. type : amount
    ...holdSells,
    ...mainSells,
    ...microSells,
  };
  let buys = {
    // ex. type : amount
    ...holdBuys,
    ...mainBuys,
    ...microBuys,
  };

  // Make sells / buys based on the algos output
  // amount should always be a number
  // TODO: ADD TYPESCRIPT!!!
  Object.values(sells).forEach(async (amount) => {
    console.log({ amount });
    // TODO: If the trade fails then this needs to track this
    await handleSellLogic(amount);
  });
  console.log({ buys });
  Object.values(buys).forEach(async (amount) => {
    console.log({ amount });
    await handleBuyLogic(amount);
  });

  newData.Micro = newMicroData;

  console.log({ newData });
  return { newData };
};

// ==========================
// Data Management
// ==========================
const setData = (key, value) => {
  chrome.storage.sync.set({ [key]: value }, () => {
    console.log(`Set ${key} to ${value}`);
  });
};

const getData = async () => {
  const getStorageData = (key) =>
    new Promise((resolve, reject) =>
      chrome.storage.sync.get(key, (result) =>
        chrome.runtime.lastError
          ? reject(Error(chrome.runtime.lastError.message))
          : resolve(result)
      )
    );

  const { data } = await getStorageData("data");
  return { data };
};

const doRegularLoop = async () => {
  // Display the current price

  console.log(getCurrentPrice());
  const { data } = await getData();
  console.log({ data });
  const { newData } = await runAllTradingAlgos(data);
  setData("data", newData);
};

const resetData = () => {
  // TODO: make a reset function for this

  const allData = {
    Micro: {
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
        trades: {},
        currentMissedTrades: 0,
        allMissedTrades: {},
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
  // Wait ten seconds before running any code
  console.log("Wait twenty seconds before running any code");
  setInterval(async () => {
    await doRegularLoop();

    // resetData();
  }, 3000);
}, 20000);

// Example of what data looks like
