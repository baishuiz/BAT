;(function (bat) {
    var base = bat.base;
    // var userCaseManage = new base.TaskManage();
    // var segmentManger  = new base.TaskManage();
    //var stage = new base.Page();


    var _historyPushState  =  history.pushState;
    window.history.pushState = function(json,title,url){
    //    beacon.on("url change");
     console.log("BAT::CASEDONE");
         alert("BAT URL Change to:" + url);
        //_historyPushState.apply(window, arguments)
        _historyPushState.call(window.history,json,title,url)
        //alert("BAT::URLCHANGED");
    }


    var openAPI = {

        config : function(config){

        },

        goto : function(uri){
            stage.src =   uri;
        },

        page : function(){
            // var api = {
            //     test : openAPI.test,
            //     wait : function(){
            //         base.wait();
            //         return api
            //     }
            // }
            //
            // return api;
        },

        get : function(selector){
          //  return stage.contentDocument.querySelector(selector);
        },

        the : function(target){
            //return new base.Assert(target);
        },

        userCase : function(desc, startPath, tcase){
            // var caseProxy = {
            //   desc    : desc,
            //   startPath   : startPath,
            //   tryDoCase : tcase
            // };
            // userCaseManage.set(caseProxy);
        },

        start : function(){
            // userCaseManage.run();
        },

        test : base.test,
        log : base.log,
        open : base.open,
        dom : base.dom,
        wait : base.wait,

        events : base.events,

        let : function(target) {
            return {
              on : function(event){
                    beacon(target).once(event);
              }
            }

        }


    };

    beacon.utility.blend(bat, openAPI);
    base.utility = beacon.utility;
    base.init();
})(bat);
