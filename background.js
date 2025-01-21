let tabHistory = [];

chrome.tabs.onActivated.addListener((activeInfo) =&gt; {
  tabHistory = tabHistory.filter(tabId =&gt; tabId !== activeInfo.tabId);
  tabHistory.push(activeInfo.tabId);
});

chrome.tabs.onRemoved.addListener((tabId) =&gt; {
  tabHistory = tabHistory.filter(id =&gt; id !== tabId);
  const lastTabId = tabHistory.pop();
  if (lastTabId !== undefined) {
    chrome.tabs.update(lastTabId, { active: true });
  }
});