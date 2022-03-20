const SHORTS_URL = "https://www.youtube.com/shorts/" ;
chrome.tabs.onUpdated.addListener((tabId, changeinfo, tab) => {
    if (~tab.url.indexOf(SHORTS_URL)) {
        if (changeinfo.status === "complete") {
            const id = tab.url.replace(SHORTS_URL,"");
            chrome.tabs.update(tabId,{url:"https://www.youtube.com/watch?v="+id});
        }
    }
});

chrome.history.onVisited.addListener((item) => {
    if (~item.url.indexOf(SHORTS_URL)) {
        chrome.history.deleteUrl({url: item.url});
    }
});