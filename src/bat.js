;(function (global) {
    var bat  = function(){};
    var bat.toString = function () { return "baishuiz@gmail.com"};

    var core = {
    	beacon : global.beacon,
        init: function () {
            var freeze = Object.freeze;
            global.bat = bat;
            beacon.utility.merge(bat, preBat);
            beacon.logoffGlobal();
            delete global.bat.base; 
            freeze && freeze(bat); 
        }
    };
    
    
    var preBat = {base:core}; 
    global.bat = preBat; 
    
})(this);