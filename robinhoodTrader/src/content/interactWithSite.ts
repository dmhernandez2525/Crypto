export const clickReviewButton = () => {
  // console.log("Click the review button");

  const element: HTMLElement = document.querySelectorAll(
    "[data-testid=OrderFormPrimaryButtonReview]"
  )[0] as HTMLElement;

  element.click();
};

export const clickDoneButton = async () => {
  // Find the done button
  // console.log("Find the done button");
  let spans: any = document.getElementsByTagName("span");
  let spanContainer;

  for (let i = 0; i < spans.length; i++) {
    if (spans[i].outerText === "Done") {
      spanContainer = spans[i].parentNode as HTMLElement;
      break;
    }
  }
  // Click the done button
  // console.log("Click the done button");
  spanContainer && (await spanContainer.click());
};

export const enterValue = (value: number) => {
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
  // console.log("Sell");

  const element: HTMLElement = document.querySelectorAll(
    "[data-testid=OrderFormPrimaryButtonSubmit]"
  )[0] as HTMLElement;

  element.click();
};

export const handleBuy = () => {
  // console.log("Buy");

  const element: HTMLElement = document.querySelectorAll(
    "[data-testid=OrderFormPrimaryButtonSubmit]"
  )[0] as HTMLElement;

  element.click();
};
