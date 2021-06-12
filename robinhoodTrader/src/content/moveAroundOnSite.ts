export const clickSellTab = () => {
  // console.log("Move to the sell tab");

  document.querySelectorAll("[data-testid=OrderFormHeading-Sell]")[0].click();
  document.querySelectorAll("[data-testid=OrderForm]")[0].click();
};

export const clickBuyTab = () => {
  // console.log("Move to the buy tab");

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

export const clickSellType = () => {
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
