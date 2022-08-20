function options_main() {
    var exec = function() {
        stored.init();
        stored.setInputLimit();
        saveLimit.bindClick();
        resetTotal.bindClick();
    };

    exec();
}
$(options_main);