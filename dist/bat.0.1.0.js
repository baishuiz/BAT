;(function (global) {
    var bat  = function(){};
    bat.toString = function () { return "baishuiz@gmail.com"};

    var core = {
    	beacon : global.beacon,
        init: function () {
            var freeze = Object.freeze;
            global.bat = bat;
            bat.utility.merge(bat, preBat);
            bat.logoffGlobal();
            delete global.bat.base; 
            freeze && freeze(bat); 
        }
    };
    
    
    var preBat = {base:core}; 
    global.bat = preBat; 
    
})(this);;;(function (bat) {
    var base = bat.base;
    var userCaseManage = new base.TaskManage();
    var segmentManger  = new base.TaskManage();

    var openAPI = {
        
        the : function(target){
            return new base.Assert(target);
        },

        userCase : function(desc, startPath, tcase){
            var caseProxy = {
              desc    : desc,
              startPath   : startPath,
              tryDoCase : tcase
            };
            userCaseManage.set(caseProxy);            
        },

        start : function(){
            userCaseManage.run();
        },

        test : function(){
             segmentManger
        },

        let : function(target) {
            return {
              on : function(event){
                    beacon(target).once(event);
              }
            }

        }

        
    };

    beacon.utility.blend(bat, openAPI);
    bat.init();
})(bat);