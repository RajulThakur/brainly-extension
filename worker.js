import setToken from "./setToken.js";
console.log("Service worker initialized");

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed/updated");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { action, token } = message;
  
  if (action === "saveToken") {
    setToken({ token });
    sendResponse({ success: true });
  }
  
  if (action === "getCurrentTab") {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      sendResponse({ 
        url: currentTab?.url, 
        title: currentTab?.title,
        success: true 
      });
    });
    return true; // Required for async response
  }
});

// chrome.action.onClicked.addListener(async () => {
//   try {
//     const tabInfo = await getCurrentTab();
//     if (tabInfo.success) {
//       console.log("Current URL:", tabInfo.url);
//       console.log("Page Title:", tabInfo.title);
//       console.log("Tab ID:", tabInfo.id);
//     } else {
//       console.error("Failed to get tab info:", tabInfo.error);
//     }
//   } catch (error) {
//     console.error("Error in click handler:", error);
//   }
// });
