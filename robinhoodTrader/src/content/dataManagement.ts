import { ITradingData } from "../interfaces";
import { refreshPage } from "./refreshPage";

interface ISetDataProps {
  index: string;
  newTradingData: ITradingData;
  shouldReset: boolean;
}

export const setData = async ({
  index,
  newTradingData,
  shouldReset,
}: ISetDataProps) => {
  await chrome.storage.sync.set({ [index]: newTradingData }, () => {
    console.log(`Set ${index} to ${newTradingData}`);
  });

  await new Promise<void>((resolve) => {
    setTimeout(() => {
      setTimeout(() => {
        resolve();
      }, 1000);
    }, 1000);
  });

  shouldReset && (await refreshPage());
};

export const getData = async () => {
  const getStorageData = (key: string) =>
    new Promise((resolve, reject) =>
      chrome.storage.sync.get(key, (result) =>
        chrome.runtime.lastError
          ? reject(Error(chrome.runtime.lastError.message))
          : resolve(result)
      )
    );

  const { tradingData }: any = await getStorageData("tradingData");
  return { tradingData };
};
