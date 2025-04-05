export default async function getToken(key) {
  try {
    const result = await chrome.storage.local.get(key);
    return result[key];
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
}
