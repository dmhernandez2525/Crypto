// ==========================
// Move Around On Site
// ==========================
import { clickBuyTab, clickSellType, clickSellTab } from "./moveAroundOnSite";

export const getOrderTypes = (): {
  limit: HTMLAnchorElement;
  market: HTMLAnchorElement;
} | null => {
  //TODO: this needs to be cleaned up
  // console.log("Click the order type button");
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

export const getCurrentPrice = (type: string): number | null => {
  const appElement = document.getElementsByClassName("app")[0] as HTMLElement;
  if (type === "buy") {
    if (appElement.style.backgroundColor !== "turquoise") {
      appElement.style.backgroundColor = "turquoise";
    }

    clickBuyTab();
  }
  if (type === "sell") {
    if (appElement.style.backgroundColor !== "mediumvioletred") {
      appElement.style.backgroundColor = "mediumvioletred";
    }

    clickSellTab();
  }

  const elementWrapper: HTMLElement | null = document.querySelector(
    "[data-testid=OrderForm]"
  );

  if (elementWrapper !== null) {
    const element: HTMLElement | null = Array.from(
      document.querySelector("[data-testid=OrderForm]").querySelectorAll("span")
    ).find((el) => el.textContent === "Estimated Price");

    if (element !== null) {
      // This is the div that wrapps estimated price and current price
      let element2 = element.parentElement.parentElement
        .parentElement as HTMLElement;

      let element3 = element2.children as HTMLElement;
      let element4 = element3[1].querySelector("span") as HTMLElement;
      let price = element4.innerText;

      return parseFloat(parseFloat(price.split("$")[1]).toFixed(6));
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
