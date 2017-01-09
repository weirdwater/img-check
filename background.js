chrome.browserAction.onClicked.addListener(tab => {
	chrome.tabs.executeScript(null, { file: 'img-check.js' })
	chrome.tabs.insertCSS(null, { file: 'img-check.css' })
})