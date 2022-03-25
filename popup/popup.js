document.addEventListener('DOMContentLoaded', function () {
    const LOAD_SETTINGS = (key) => new Promise(resolve => {
        chrome.storage.sync.get(key, (resolut) => { resolve(resolut[key]); });
    });
    const SAVE_SETTINGS = (keyword, value) => {
        const options = {}
        options[keyword] = value;
        chrome.storage.sync.set(options);
    };
    const ext_sw = document.getElementById('ext_sw');
    const tab_sw = document.getElementById('tab_sw');
    const toback_sw = document.getElementById('toback_sw');
    const extChange = () => {
        const state = ext_sw.checked ? 'enable' : 'disable';
        document.getElementById('tab_sw').switchButton(state);
        document.getElementById('toback_sw').switchButton(state);
        SAVE_SETTINGS('extSetting', ext_sw.checked);
    };
    const tabChange = () => {
        SAVE_SETTINGS('tabSetting', tab_sw.checked);
    };
    const tobackChange = () => {
        SAVE_SETTINGS('tobackSetting', toback_sw.checked);
    };
    ext_sw.addEventListener('change', extChange);
    tab_sw.addEventListener('change', tabChange);
    toback_sw.addEventListener('change', tobackChange);
    LOAD_SETTINGS('extSetting').then(res => res ? 'on' : 'off').then(res => ext_sw.switchButton(res));
    LOAD_SETTINGS('tabSetting').then(res => res ? 'on' : 'off').then(res => tab_sw.switchButton(res));
    LOAD_SETTINGS('tobackSetting').then(res => res ? 'on' : 'off').then(res => toback_sw.switchButton(res));
});