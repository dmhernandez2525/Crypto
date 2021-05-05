const clickSellTab = () => {
  document.querySelectorAll("[data-testid=OrderFormHeading-Sell]")[0].click();
};
const clickBuyTab = () => {
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

setTimeout(() => {
  let flag = true;
  let flag2 = true;

  setInterval(() => {
    if (!flag2 && !flag2) {
      // Display the current price
      console.log(getCurrentPrice());
    }

    if (flag) {
      console.log("Move to the sell tab");
      //  Move to the sell tab
      clickSellTab();
      flag = false;
    }

    if (!flag && flag2) {
      // Enter amount
      enterValue(0.4);

      //   Click the review button
      clickReviewButton();

      setTimeout(() => {
        // Sell
        handleSell();

        setTimeout(() => {
          clickDoneButton();
          flag2 = false;
        }, 500);
      }, 500);
    }
  }, 3000);
}, 10000);

// document.querySelector("#react_root > main > div:nth-child(3) > div > div > div > div > div > div > div > div.col-5 > div > div._2Pmzq64aRZSbuRk9bTAy8I._7qGfynPzmLSrSvaJCuhA_ > div:nth-child(2) > form")

// #react_root > main > div:nth-child(3) > div > div > div > div > div > div > div > div.col-5 > div > div._2Pmzq64aRZSbuRk9bTAy8I._7qGfynPzmLSrSvaJCuhA_ > div:nth-child(2) > form

//TODO: Make app for this!!!
// - super meta talk to bjj
// - Events / logn
