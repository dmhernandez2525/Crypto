// ==========================
// Move Around On Site
// ==========================
import { clickBuyTab, clickSellType } from "./moveAroundOnSite";

export const getOrderTypes = () => {
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

export const getCurrentEquity = () => {
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

export const getCurrentCoinAmount = () => {
  clickSellType();

  parseInt(
    document
      .querySelectorAll("[data-testid=OrderForm]")[0]
      .querySelector("footer")
      .textContent.split("DOGE Available")[0]
  );
};

export const getCurrentPrice = () => {
  let priceArray = [];

  Array.from(
    document.querySelectorAll("[data-testid=PortfolioValue]")[0].children[0]
      .children[0].firstChild.firstChild.children
  ).forEach((ele) => priceArray.push(ele.innerText));

  return parseFloat(parseFloat(priceArray.join("").split("$")[1]).toFixed(3));
};

export const getCurrentBuyingPower = () => {
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
