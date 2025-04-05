export async function getCurrentTab() {
  try {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return {
      url: tab?.url,
      title: tab?.title,
      id: tab?.id,
      success: true
    };
  } catch (error) {
    console.error("Error getting current tab:", error);
    return {
      success: false,
      error: error.message
    };
  }
}
