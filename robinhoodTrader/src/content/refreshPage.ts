export const refreshPage = async () => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
  //     chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
  //   });

  await new Promise<void>((resolve) => {
    setTimeout(() => {
      try {
        window.location.href = window.location.href;
      } catch (error) {
        console.log("//=======================================>");
        console.log("THERE WAS AN ERROR IN WITH THE FIRST REFRESH CODE");
        console.log({ error });
        console.log("//=======================================>");
        try {
          setTimeout(() => {
            document.location.reload();
            resolve();
          }, 1000);
        } catch (error) {
          console.log("//=======================================>");
          console.log("THERE WAS AN ERROR IN WITH THE SECOND REFRESH CODE");
          console.log({ error });
          console.log("//=======================================>");
          resolve();
        }
      }
    }, 1000);
  });
};

// TODO: look for buttons that shouldint be there
// clickDoneButton();
