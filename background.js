let tabHistory = [];

chrome.tabs.onActivated.addListener((activeInfo) => {
  tabHistory = tabHistory.filter((tabId) => tabId !== activeInfo.tabId);
  tabHistory.push(activeInfo.tabId);
});

chrome.tabs.onRemoved.addListener((tabId) => {
  tabHistory = tabHistory.filter((id) => id !== tabId);
  const lastTabId = tabHistory.pop();
  if (lastTabId !== undefined) {
    chrome.tabs.update(lastTabId, { active: true });
  }
});
