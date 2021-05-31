// ==========================
// Move Around On Site
// ==========================
import { clickSellTab, clickBuyTab } from "./moveAroundOnSite";

// ==========================
// Interact With Site
// ==========================
import {
  clickReviewButton,
  clickDoneButton,
  enterValue,
  handleSell,
  handleBuy,
} from "./interactWithSite";

export const handleSellLogic = async (amount: number) => {
  //  Move to the sell tab
  clickSellTab();

  // Should allays be selling in terms of usd
  enterValue(amount);

  // Click the review button
  clickReviewButton();

  await new Promise<void>((resolve) => {
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

export const handleBuyLogic = async (amount: number) => {
  //  Move to the buy tab
  clickBuyTab();

  // Should allays be buying in terms of usd
  enterValue(amount);

  // Click the review button
  clickReviewButton();
  await new Promise<void>((resolve) => {
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
