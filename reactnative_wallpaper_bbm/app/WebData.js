import NetworkCheck from './NetworkCheck';
import * as Storage from './Storage';

const sitebase = "https://www.babymetalfan.club";

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const _LoadWallpapersAsync = async (d) => {
    //const regexATagRule = /<a(.*?)<\/a>\1/;
    //const regexHrefRule = /href='(.*?)'/g;
    //const regexHrefRule = /href=[(\/|\\|'|")](.*?)[('|")]/g;
    //const regexHrefRule = /(['""])(.*?)([^'""])\1/;
    //const regexImgRule = /src=[(\/|\\|'|")](.*?)[('|")]/g;

    const regexImgSrcRule = /(['""])([^'""]+\.(jpg|jpeg|png|bmp|gif))\1/;
    const regexATagRule = /<a(.*?)<\/a>/g;
    const regexHrefRule = /href=(['""])(.*?)([^'""])\1/;
    const regexClassRule = /class=(['""])(.*?)([^'""])\1/;
    const regexImgRule = /src=(['""])([^'""]+\.(jpg|jpeg|png|bmp|gif))\1/;

    const urls = d["urls"];
    const priorities = d["priority"];
    let searchUrl = d["url"];
    let searchUrlTag = d["tag"];
    let response = "";
    let htmlString = "";
    let htmlRegexString = "";
    let images = [];
    let tries = 0;

    if (searchUrl == urls.none.url) {
        let rdm = (Math.floor(Math.random() * priorities.length));
        let rdmPriority = priorities[rdm].value;
        searchUrl = urls[rdmPriority].url;
        searchUrlTag = urls[rdmPriority].tag;
    }

    while (images.length == 0 && tries < 10) {
        tries++;

        response = await fetch(searchUrl);
        let htmlString = await response.text();
        htmlRegexString = htmlString;

        while (true) {
            try {
                let matches = regexATagRule.exec(htmlRegexString);

                if (matches == null || matches.length == 0)
                    break;

                match = matches[0]

                for (var m in matches) {
                    htmlRegexString = htmlRegexString.replace(m, "", htmlRegexString);
                }

                let hrefMatch = regexHrefRule.exec(match)
                let srcMatch = regexImgRule.exec(match)
                let aClass = regexClassRule.exec(match)
                if (hrefMatch === null || hrefMatch.length < 2)
                    continue;
                if (srcMatch === null || srcMatch.length < 1)
                    continue;
                if (aClass === null || aClass.length < 1)
                    continue;


                const doReplace = (src) => src.toString()
                    .replace('href=', '')
                    .replace('src=', '')
                    .replace('"', '').replace('"', '')
                    .replace("'", "").replace("'", "")
                    .replace(sitebase, "");

                let href = `${sitebase}${doReplace(hrefMatch[0])}`
                let src = doReplace(srcMatch[0])
                let classes = aClass[0];

                if (classes.indexOf("img") === -1)
                    continue;

                let image = { href: href, src: src, key: src };
                images.push(image);
            } catch (e) {
                console.log("error searching images _LoadWallpapersAsync", e)
                break;
            }
        }

        if (images.length > 0)
            break
    }
    
    return {
        url: searchUrl,
        tag: searchUrlTag,
        images: images,
        htmlString: htmlString,
    };
}

const LoadWallpapersAsync = async (d) => {
    let hasInternet = await NetworkCheck(d.config.onlyWifi);
    let wallpaperData = "";
    let gotError = true;
    let message = "";
    let description = "";
    try {
        if (!hasInternet) {
            throw 'No internet connection, or you selected to run as "WiFi only"';
        }

        wallpaperData = await _LoadWallpapersAsync(d);
        gotError = false;
    } catch (e) {
        console.log("error LoadingWallpapers", e)
        message = e;
        gotError = true;
    }

    try {
        await Storage.CleanAppData();
    } catch (e) {
        console.log("error trying to clean data in LoadWallpapersAsync", e)
    }

    return {
        url: wallpaperData.url,
        urlTag: wallpaperData.tag,
        htmlString: wallpaperData.htmlString,
        images: wallpaperData.images,
        error: gotError,
        message: message
    };
}

export default LoadWallpapersAsync;
