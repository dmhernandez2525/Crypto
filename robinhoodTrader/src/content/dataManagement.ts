import { ITradingData } from "../interfaces";
export const setData = (key: string, value: ITradingData) => {
  chrome.storage.sync.set({ [key]: value }, () => {
    console.log(`Set ${key} to ${value}`);
  });
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
