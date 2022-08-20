var tryToCopyAgain = function(){
    setTimeout(copyText, 100);
    console.log("trying to copy again");
};
var setContent = function(){
    var text = rdmLorem();
    var n = parseInt($("#limit").val());
    $("#content").text(clampText(n, text));
};
var copyText = function(){
    try {
        var textToCopy = $("#content");

        if(typeof textToCopy === 'undefined'){  tryToCopyAgain(); return false; }
        if(textToCopy.length < 1){              tryToCopyAgain(); return false; }

        selectText("content");
        document.execCommand("copy");
        clearSelection();
        return true;
    } catch (error) {
        tryToCopyAgain();
        return false;
    }
};
var setWarning = function(txt){ $(".warning").text(txt); };
var setActionClick = function(){ $("#LimitGenerator").click(exec); };
var exec = function() {
    setContent();
    if(copyText() === true){
        setWarning("Copied Lorem to clipboar");
    }else{
        setWarning("Error to copy Lorem, please do it manualy");
    }
};


function popup_main() {
    try {   exec();             } catch (error) {}
    try {   setActionClick();   } catch (error) {}
}
$(popup_main);