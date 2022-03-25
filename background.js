const SHORTS_URL = "https://www.youtube.com/shorts/";
const SETTINGS = {};
const LOAD_SETTINGS = (key) => new Promise(resolve => {
    chrome.storage.sync.get(key, (resolut) => { resolve(resolut[key]); });
});
LOAD_SETTINGS("extSetting").then(res => SETTINGS.extSetting = res);
LOAD_SETTINGS("tabSetting").then(res => SETTINGS.tabSetting = res);
LOAD_SETTINGS("tobackSetting").then(res => SETTINGS.tobackSetting = res);

chrome.tabs.onUpdated.addListener((tabId, changeinfo, tab) => {
    if (!SETTINGS.extSetting) return;
    if (~tab.url.indexOf(SHORTS_URL)) {
        if (changeinfo.status === "complete") {
            const id = tab.url.replace(SHORTS_URL, "");
            if (SETTINGS.tobackSetting) chrome.tabs.goBack(tabId);
            if (SETTINGS.tabSetting) {
                chrome.tabs.create({ url: "https://www.youtube.com/watch?v=" + id });
            } else {
                chrome.tabs.update(tabId, { url: "https://www.youtube.com/watch?v=" + id });
            }
        }
    }
});

chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync") return;
    Object.keys(changes).forEach(key =>
        SETTINGS[key] = changes[key]?.newValue
    );
});