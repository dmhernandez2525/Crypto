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
  // TODO: clean this up
  let element = document.querySelectorAll(
    "[data-testid=OrderForm]"
  )[0] as HTMLElement;

  let element2 = element.querySelector("footer");

  if (element2 && element2.textContent) {
    parseInt(element2.textContent.split("DOGE Available")[0]);
  }
};

export const getCurrentPrice = () => {
  let priceArray: any = [];
  // TODO: clean this up
  let element = document.querySelectorAll(
    "[data-testid=PortfolioValue]"
  )[0] as HTMLElement;
  let element2 = element.children[0] as HTMLElement;
  let element3 = element2.children[0] as HTMLElement;
  let element4 = element3?.firstChild?.firstChild as HTMLElement;

  Array.from(element4?.children).forEach((ele: any) =>
    priceArray.push(ele.innerText)
  );

  return parseFloat(parseFloat(priceArray.join("").split("$")[1]).toFixed(3));
};

export const getCurrentBuyingPower = () => {
  clickBuyTab();
  // TODO: clean this up
  const element = document.querySelectorAll(
    "[data-testid=OrderForm]"
  )[0] as HTMLElement;
  const element2: any = element?.querySelector("footer")
    ?.firstChild as HTMLInputElement;

  const element3: string = element2.outerText.split(" available")[0];

  const currentBuyingPower: number = parseInt(element3.split("$")[1]);
  const onePercent = currentBuyingPower / 100;

  return currentBuyingPower - onePercent;
};
