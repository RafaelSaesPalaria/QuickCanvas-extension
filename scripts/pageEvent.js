// Main Code
chrome.runtime.onMessage.addListener(function name(params) {
    chrome.tabs.query({active:true, currentWindow: true},function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id,params)
    });
})