var popup = {
    callToAction: function(me){
        var pg = $(me).attr("page");
        var act = $(me).attr("action");
        var url = $(me).attr("url");
        chrome.tabs.executeScript(null, {
            file: "app.js"
        });
    
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {page: pg, action: act, url: url});
        });
    },
    bind: function(){
        $(".link").click(function(){ popup.callToAction(this); });
        $(".action").click(function(){ popup.callToAction(this); });
        
    },
    timer: function(){
        setInterval(function(){
            var timer = document.querySelector("#timer");
            var time = parseInt(timer.textContent);
            time++;
            timer.textContent = time;
        }, 1000);
    },
    init: function(){
        popup.bind();
        popup.timer();
    }
};

$(popup.init);