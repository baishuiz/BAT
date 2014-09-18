;(function (bat) {
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