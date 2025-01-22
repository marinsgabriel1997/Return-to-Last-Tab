### "Return to Last Tab" Extension - Quick Guide (Chrome)

#### 1. **File Setup**

The extension has two files:

- **manifest.json**: This is the setup/config file.
- **background.js**: This file keeps track of your tab history and switches to the last active tab when you close one.

##### **manifest.json**

```json
{
  "manifest_version": 3,
  "name": "Return to Last Tab",
  "version": "1.0",
  "description": "Returns to the last active tab when closing a tab.",
  "permissions": ["tabs"],
  "background": {
    "service_worker": "background.js"
  }
}
```

##### **background.js**

```javascript
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
```

#### 2. **How to Install in Chrome**

1. **Create a folder** and drop the `manifest.json` and `background.js` files in it.
2. **Go to `chrome://extensions/`** in your browser.
3. **Turn on "Developer mode"** in the top right.
4. Click on "Load unpacked" and select the folder with your files.

#### 3. **How it Works**

Once installed, the extension will automatically switch to the last tab when you close one. It’s super simple — just close a tab, and boom, it takes you to the previous one!
