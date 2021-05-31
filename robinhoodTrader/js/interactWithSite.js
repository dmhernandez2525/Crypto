export const clickReviewButton = () => {
  console.log("Click the review button");
  document
    .querySelectorAll("[data-testid=OrderFormPrimaryButtonReview]")[0]
    .click();
};

export const clickDoneButton = async () => {
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

export const enterValue = (value) => {
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

export const handleSell = () => {
  console.log("Sell");
  document
    .querySelectorAll("[data-testid=OrderFormPrimaryButtonSubmit]")[0]
    .click();
};

export const handleBuy = () => {
  console.log("Buy");
  document
    .querySelectorAll("[data-testid=OrderFormPrimaryButtonSubmit]")[0]
    .click();
};
