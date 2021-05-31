export const setData = (key, value) => {
  chrome.storage.sync.set({ [key]: value }, () => {
    console.log(`Set ${key} to ${value}`);
  });
};

export const getData = async () => {
  const getStorageData = (key) =>
    new Promise((resolve, reject) =>
      chrome.storage.sync.get(key, (result) =>
        chrome.runtime.lastError
          ? reject(Error(chrome.runtime.lastError.message))
          : resolve(result)
      )
    );

  const { data } = await getStorageData("data");
  return { data };
};
