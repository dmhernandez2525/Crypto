// ==========================
// Move Around On Site
// ==========================
import { clickBuyTab, clickSellType } from "./moveAroundOnSite";

export const getOrderTypes = (): {
  limit: HTMLAnchorElement;
  market: HTMLAnchorElement;
} | null => {
  //TODO: this needs to be cleaned up
  console.log("Click the order type button");
  const menuPopoverWrapper: NodeListOf<HTMLElement> | null =
    document.querySelectorAll("[data-testid=MenuPopoverTrigger]");
  const menuPopover: HTMLElement | null = menuPopoverWrapper[0];

  if (menuPopoverWrapper !== null && menuPopover !== null) {
    menuPopover.click();
  }

  const test: HTMLCollectionOf<Element> | null =
    document.getElementsByClassName("card-heading");

  if (test === null) {
    return null;
    // alert("oops");
  } else {
    const test2: HTMLElement | null = test[1] ? (test[1] as HTMLElement) : null;
    if (test2 === null) {
      return null;
      // alert("oops");
    } else {
      const test3: HTMLElement | null = test2.parentNode
        ? (test2.parentNode as HTMLElement)
        : null;

      if (!test3) return null;
      // if (!test3) alert("oops");
      else {
        const test4: NodeListOf<HTMLAnchorElement> = test3.querySelectorAll(
          "a"
        ) as NodeListOf<HTMLAnchorElement>;
        if (!test4) return null;
        // if (!test4) alert("oops");
        else {
          // TODO:
          // - find a better way to do this
          // - What is this doing?
          // - update types
          const test5 = Array.from(test4).filter((e) => {});

          const limit: HTMLAnchorElement = test5[0];
          const market: HTMLAnchorElement = test5[0];

          return { limit, market };
        }
      }
    }
  }
};

export const getCurrentEquity = (): number => {
  //TODO: this needs to be cleaned up
  const divs: HTMLCollectionOf<HTMLDivElement> | null =
    document.getElementsByTagName("div");
  let divContainer: HTMLElement | null = null;

  for (let i = 0; i < divs.length; i++) {
    if (divs[i].innerText === "Your Equity") {
      const test1: HTMLElement = divs[i];
      if (test1 !== null) {
        const test2: HTMLElement | null = test1.parentNode
          ? (test1.parentNode as HTMLElement)
          : null;

        if (test2 !== null) {
          divContainer = test2;
          break;
        }
      }
    }
  }
  if (divContainer !== null) {
    const unformattedTextWrapper: HTMLElement | null =
      divContainer.querySelector("span");

    if (unformattedTextWrapper !== null) {
      const unformattedText: string = unformattedTextWrapper.innerText;

      if (unformattedText) {
        const formattedText: number = parseInt(unformattedText.split("$")[1]);

        return formattedText;
      }
    }
  }
  return 0;
};

export const getCurrentCoinAmount = (): number => {
  clickSellType();
  // TODO: clean this up
  const element: NodeListOf<HTMLElement> | null = document.querySelectorAll(
    "[data-testid=OrderForm]"
  );

  if (element !== null && element[0] !== null) {
    const element2: HTMLElement | null = element[0].querySelector("footer");

    if (element2 && element2.textContent) {
      return parseInt(element2.textContent.split("DOGE Available")[0]);
    }
  }

  // TODO: refator this
  return 0;
};

export const getCurrentPrice = (): number | null => {
  const priceArray: string[] = [];
  // TODO: clean this up
  const elementWrapper: NodeListOf<HTMLElement> | null =
    document.querySelectorAll("[data-testid=PortfolioValue]");

  if (elementWrapper !== null) {
    const element: HTMLElement | null = elementWrapper[0];

    if (element !== null) {
      let element2 = element.children[0] as HTMLElement;
      let element3 = element2.children[0] as HTMLElement;
      let element4 = element3?.firstChild?.firstChild as HTMLElement;

      Array.from(element4?.children).forEach((ele: any) =>
        priceArray.push(ele.innerText)
      );

      return parseFloat(
        parseFloat(priceArray.join("").split("$")[1]).toFixed(3)
      );
    }
  }
  return null;
};

export const getCurrentBuyingPower = (): number => {
  clickBuyTab();
  // TODO: clean this up
  const element: HTMLElement = document.querySelectorAll(
    "[data-testid=OrderForm]"
  )[0] as HTMLElement;

  const element2: HTMLInputElement = element?.querySelector("footer")
    ?.firstChild as HTMLInputElement;

  const element3: string = element2.innerText.split(" available")[0];

  const currentBuyingPower: number = parseInt(element3.split("$")[1]);
  const onePercent: number = currentBuyingPower / 100;

  return currentBuyingPower - onePercent;
};

// TODO:
// - Remove all test varible names
// - Reduce the cyclomatic complexity
// - Add try catch and better error handling
// - Clean up lets
