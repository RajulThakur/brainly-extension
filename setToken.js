export default function setToken(data) {
  chrome.storage.local.set(data);
}
