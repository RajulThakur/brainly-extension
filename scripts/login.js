console.log("Running content script");
const token = localStorage.getItem("token");
console.log("Token:", token);
// sending token to worker
chrome.runtime.sendMessage({
  action: "saveToken",
  token,
});
