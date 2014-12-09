;(function (global) {
    var bat  = function(){};
    bat.toString = function () { return "baishuiz@gmail.com"};

    var core = {
    	beacon : global.beacon,
        init: function () {
            var freeze = Object.freeze;
            
            global.bat.base.utility.merge(bat, preBat);
            beacon.logoffGlobal();
            global.Bat = bat;
            delete global.bat.base; 
            freeze && freeze(bat); 
        }
    };
    
    
    var preBat = {base:core}; 
    global.bat = preBat; 
    
})(this);