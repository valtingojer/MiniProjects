
var de = { page: null, action: null, url: null, clean: function(){ d = de; } };
var d = { page: null, action: null, url: null, clean: function(){ d = de; } };

var setHtmlStyle = function(color){
    var htmlStyle = "";
    htmlStyle += "border: 20px solid " + color + "; ";
    htmlStyle += "padding-right: 400px; ";
    document.querySelector("html").setAttribute("style", htmlStyle);
}

setHtmlStyle("red");
chrome.runtime.onMessage.addListener(app);

function app(request, sender, sendResponse) {
    d.page = request.page;
    d.action = request.action;
    d.url = request.url;

    btn[d.page][d.action]();

    setHtmlStyle("yellowgreen");

    d.clean();
}
//document.querySelector('a[my-i18n*="join"]').click()
var click = {
    tagSelector: function(tag){ 
        try { document.querySelector(tag).click(); } catch (error) {}
    }
};
var btn = {
    addMeFast:{ 
        like: function(){ document.querySelector(".single_like_button").click(); },
        link: function(){ window.location.href = d.url; }
    },
    facebook:{
        pageLike: function()  { click.tagSelector('a[href*="profile.php"]'); },
        pageFollow: function(){ click.tagSelector('a[href*="profile.php"]'); },
        postLike: function()  { click.tagSelector('a[href*="like.php"]'); }
    },
    telegran:{
        channelJoin: function(){ click.tagSelector('a[my-i18n*="join"]'); },
    },
    instagram:{
        follow: function(){ click.tagSelector('main header section button'); },
        like: function(){ click.tagSelector('article div section button'); },
        //document.querySelector('article div section button').click()
    },
    tiktok:{
        follow: function(){ click.tagSelector('header button'); },
        like: function(){ click.tagSelector('strong[title*="like"]'); },
    },
    youtube:{
        subscribe: function(){ click.tagSelector('paper-button.ytd-subscribe-button-renderer'); },
        like: function(){ click.tagSelector('#top-level-buttons .yt-simple-endpoint'); },
    },
    pinterest:{
        save: function(){ click.tagSelector('button[data-test-id*="PinBetterSaveButton"]'); },
        follow: function(){ click.tagSelector('.G0a.BsF, .Il7.Jrn'); },
    },
    soundcloud:{
        like: function(){ click.tagSelector('button[title*="Like"]'); },
        follow: function(){ click.tagSelector('button[title*="Follow"]'); },
    },
    vk:{
        group: function(){ click.tagSelector('#mcont .profile_panel .basisGroup__buttonsRow a[href*="act=enter"]'); },
        page: function(){ click.tagSelector('#mcont .profile_panel .basisGroup__buttonsRow a[href*="act=enter"]'); },
    },
    askfm:{
        like: function(){ click.tagSelector('.icon-like'); },
    },
    okru:{
        join: function(){ click.tagSelector('a[href*="GroupJoin"]'); },
    },
    reverb:{
        fans: function(){ click.tagSelector('a[data-fan-action*="add"]'); },
    },
    window: {
        close: function(){ window.close(); }
    }
};
