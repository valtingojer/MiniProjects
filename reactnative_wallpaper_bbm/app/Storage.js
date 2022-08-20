import { AsyncStorage } from "react-native";
import ClearCache from 'react-native-clear-cache';


const storeConfigKey = 'myConfig';
const storeOptionsKey = 'myOptions';
const storeStateKey = 'myState';

//-------------------
//-----Data values
//----------------------
let config = {
    hasEverRun: false,
    interval: 1,
    priority: "none",
    onlyWifi: "false",
    resize: "fit",
    autoRun: "true",
    urls: {
        none: { url: "https://babymetalfan.club/", tag: "Babymetal" },
        yui: { url: "https://babymetalfan.club/category/yui-mizuno/", tag: "Yui" },
        moa: { url: "https://babymetalfan.club/category/moa-kikuchi/", tag: "Moa" },
        su: { url: "https://babymetalfan.club/category/suzuka-nakamoto/", tag: "Suzuka" },
        sakura: { url: "https://babymetalfan.club/category/sakura-gakuin/", tag: "Sakura" },
    },
    messages: [
        "Look what i found from",
        "Sugoi picture from",
        "AWESOME",
        "you wont belive in this picture from",
        "I wish to have that",
    ],
};
let options = {
    interval: [
        { key: "Interval", value: 1 },
        { key: "1 minute", value: 1 }, { key: "5 minutes", value: 5 }, { key: "10 minutes", value: 10 },
        { key: "30 minutes", value: 30 }, { key: "60 minutes", value: 60 }
    ],
    priority: [
        { key: "No preference", value: "none" },
        { key: "Yui", value: "yui" },
        { key: "Moa", value: "moa" },
        { key: "Suzuka", value: "su" },
        { key: "Sakura", value: "sakura" },
    ],
    onlyWifi: [
        { key: "Connection", value: "true" },
        { key: "Wifi Only", value: "true" },
        { key: "Any", value: "false" },
    ],
    resize: [
        { key: "Resize", value: "fit" },
        { key: "Fit", value: "fit" },
        { key: "Cover", value: "cover" }
    ],
    autoRun: [
        { key: "Automation", value: "true" },
        { key: "Auto", value: "true" },
        { key: "Manual", value: "false" },
    ],
};
let myState = {
    //isLoading: true,
    //scale: new Animated.Value(1),
    //reloadInterval: "",

    isRunning: true,
    images: [],
    htmlString: "",
    isImageFocused: false,

    url: "https://babymetalfan.club/",
    urlTag: "Babymetal",
};

//-------------------
//-----Privates
//----------------------
const _CreateInitialData = async (key) => {
    let data = null;
    let result = false;
    try {
        switch (key) {
            case "myConfig": data = config; break;
            case "myOptions": data = options; break;
            case "myState": data = myState; break;
            default:
                alert("Key not exist in _CreateInitialData")
        }
        if(data !== null)
            await AsyncStorage.setItem(key, JSON.stringify(data));
        result = true;
    } catch (e) {
        console.log("error storage _CreateInitialData :: ", e);
    }
    return result;
}
const _LoadFromStorage = async (key) => {
    let result = null;
    try {
        result = await AsyncStorage.getItem(key);
        if (result === null) {
            await _CreateInitialData(key);
        }
        result = await AsyncStorage.getItem(key);

        result = JSON.parse(result);
    } catch (e) {
        console.log("error storage _LoadFromStorage :: ", e);
    }
    return result;
};

//-------------------
//-----Get Data
//----------------------
export const intervalMilliseconds = async () => {
    let cfg = await GetConfig();
    return cfg.interval * 1000 * 60
};
export const intervalSeconds = async () => {
    let cfg = await GetConfig();
    return cfg.interval * 60
};

export const GetConfig = async () => await _LoadFromStorage(storeConfigKey);
export const GetOptions = async () => await _LoadFromStorage(storeOptionsKey);
export const GetState = async () => await _LoadFromStorage(storeStateKey);
export const GetRandomMessage = async (url) => {
    const sts = await GetState();
    const cfg = await GetConfig();
    const from = sts.urlTag;
    return `${cfg.messages[(Math.floor(Math.random() * cfg.messages.length))]} ${from} ${url}`;
};
export const GetWallpaperData = async () => {
    const sts = await GetState();
    const cfg = await GetConfig();
    const opt = await GetOptions();
    const priority = cfg.priority;
    const urls = cfg.urls;

    let result = {
        urls: urls,
        url: urls[priority].url,
        tag: urls[priority].tag,
        priority: opt.priority,
        config: cfg,
    };

    return result;
};
export const GetSingleStateData = async () => {
    const sts = await GetState();
    const cfg = await GetConfig();
    const opt = await GetOptions();

    return {
        ...sts,
        config: { ...cfg },
        configOptions: { ...opt },
    }
};
//-------------------
//-----Set States
//----------------------
export const SetConfig = async (cfg) => {
    let result = false;
    try {

        let data = {
            ...config,
            ...cfg,
            hasEverRun: true,
        }
        config = data;
        await AsyncStorage.setItem(storeConfigKey, JSON.stringify(data));
        result = true;
    } catch (e) {
        console.log("error saving data SetConfig :: ", e);
    }
    return result;
};
export const SetOptions = async (opt) => {
    let result = false;
    try {

        let data = {
            ...options,
            ...opt
        }
        options = data;
        await AsyncStorage.setItem(storeOptionsKey, JSON.stringify(data));
        result = true;
    } catch (e) {
        console.log("error saving data SetOptions :: ", e);
    }
    return result;
};
export const SetState = async (sts) => {
    let result = false;
    try {

        let data = {
            ...myState,
            ...sts
        }
        myState = data;
        await AsyncStorage.setItem(storeStateKey, JSON.stringify(data));
        result = true;
    } catch (e) {
        console.log("error saving data SetState :: ", e);
    }
    return result;
};


//-------------------
//-----Clear
//----------------------
const _clearAppData = async function () {
    try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
    } catch (e) {
        console.error('Error clearAppData app data.', e);
    }
}

export const CleanAppData = async function () {
    try {
        let sts = await GetState();
        let cfg = await GetConfig();

        let _cfg = config;
        let _opt = options;
        let _sts = myState;

        let cfg_interval = cfg.interval;
        let cfg_priority = cfg.priority;
        let cfg_onlyWifi = cfg.onlyWifi;
        let cfg_resize = cfg.resize;
        let cfg_autorun = cfg.autoRun;

        let sts_images = sts.images;
        let sts_url = cfg.urls[cfg_priority].url;
        let sts_urlTag = cfg.urls[cfg_priority].tag;

        _cfg.interval = cfg_interval;
        _cfg.priority = cfg_priority;
        _cfg.onlyWifi = cfg_onlyWifi;
        _cfg.resize = cfg_resize;
        _cfg.autorun = cfg_autorun;

        if (sts_images.length > 20)
            sts_images = sts_images.slice(0, 20)

        _sts.images = sts_images;
        _sts.url = sts_url;
        _sts.urlTag = sts_urlTag;

        await _clearAppData();
        
        try {
            // clear the storage
            ClearCache.clearAppCache();
        } catch (ex) {
            console.log("Error cleanning cache", ex)
        }

        await AsyncStorage.setItem(storeConfigKey, JSON.stringify(_cfg));
        await AsyncStorage.setItem(storeOptionsKey, JSON.stringify(_opt));
        await AsyncStorage.setItem(storeStateKey, JSON.stringify(_sts));

        console.log("CleanAppData success")

        return true;
    } catch (e) {
        console.log("Error cleanAppData", e)
        return false;
    }
    

};