export const refreshPage = async () => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
  //     chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
  //   });

  await new Promise<void>((resolve) => {
    setTimeout(() => {
      document.location.reload();
      resolve();
    }, 1000);
  });
};

// TODO look for buttons that shouldint be there
// clickDoneButton();
