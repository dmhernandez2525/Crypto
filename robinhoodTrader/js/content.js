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

const getOrderTypes = () => {
  console.log("Click the order type button");
  document.querySelectorAll("[data-testid=MenuPopoverTrigger]")[0].click();

  let test = document
    .getElementsByClassName("card-heading")[1]
    .parentNode.querySelectorAll("a")
    .filter((e) => {
      debugger;
    });
  // TODO find a better way to do this

  let limit = test[0];
  let market = test[0];

  return { limit, market };
};
const getCurrentBuyingPower = () => {};

const getCurrentEquity = () => {
  let divs = document.getElementsByTagName("div");
  let divContainer;

  for (let i = 0; i < divs.length; i++) {
    if (divs[i].outerText === "Your Equity") {
      divContainer = divs[i].parentNode;
      break;
    }
  }

  return divContainer.querySelector("span").outerText;
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

const clickReviewButton = () => {
  console.log("Click the review button");
  document
    .querySelectorAll("[data-testid=OrderFormPrimaryButtonReview]")[0]
    .click();
};
const clickDoneButton = () => {
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
  spanContainer.click();
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

const getCurrentPrice = () => {
  let priceArray = [];

  Array.from(
    document.querySelectorAll("[data-testid=PortfolioValue]")[0].children[0]
      .children[0].firstChild.firstChild.children
  ).forEach((ele) => priceArray.push(ele.innerText));

  return priceArray.join("");
};

const handleSellLogic = (amount) => {
  //  Move to the sell tab
  clickSellTab();

  // Should allays be selling in terms of usd
  // Enter amount
  enterValue(amount);

  //   Click the review button
  clickReviewButton();

  setTimeout(() => {
    // Sell
    handleSell();

    setTimeout(() => {
      clickDoneButton();
    }, 500);
  }, 500);
};
const handleBuyLogic = (amount) => {
  // amount should always be a number
  //  Move to the buy tab
  clickBuyTab();

  // Should allays be buying in terms of usd

  // Enter amount
  enterValue(amount);

  //   Click the review button
  clickReviewButton();

  setTimeout(() => {
    // buy
    handleBuy();

    setTimeout(() => {
      clickDoneButton();
    }, 500);
  }, 500);
};

const runTradingAlgo = async (data) => {
  // TODO: Add Typescript
  // Example of what data looks like

  // const allData = {
  //   large: {
  //     bet: 2,
  //     base: 1,
  //     hedge: 0.5,
  //   },
  //   small: {
  //     1: { bet: 2, base: 1, hedge: 0 },
  //     ".75": { bet: 1.75, base: 1, hedge: 0.25 },
  //     ".50": { bet: 1.5, base: 1, hedge: 0.5 },
  //     ".25": { bet: 1.25, base: 1, hedge: 0.75 },
  //   },
  // };

  let newData = false;

  // TODO:
  // Step 1: look at data and make any buys / sells that are necessary
  // Step 2: Update newData with all the changes from Step 1

  let currentPrice =  getCurrentPrice()

  let sells = {
    // ex. type : amount 
  }
  let buys = {
    // ex. type : amount 
  }


  // amount should always be a number
  // TODO: ADD TYPESCRIPT!!!
  Object.values(sells).forEach(amount => await handleSellLogic(amount) )
  Object.values(buys).forEach(amount => await handleBuyLogic(amount) )

  return { newData };
};

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

setTimeout(() => {
  // Wait ten seconds before running any code
  setInterval(async () => {
    // Display the current price
    console.log(getCurrentPrice());

    const { data } = await getData();
    console.log({ data });

    const { newData } = await runTradingAlgo(data);

    if (newData) {
      setData("data", newData);
    }
  }, 3000);
}, 5000);
