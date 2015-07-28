;(function (bat) {
    var base = bat.base;
    var events = {
      complete : beacon.createEvent('complete')
    }

    var depth = 0;

    var timing = function(){
          timing.start = true;
          setTimeout(function(){
            timing.start = false;
            depth++;
            beacon.on(events.complete);
          },0);
    }

    beacon.on(events.complete, function(activeContext){
        for (var i = 0; i < activeContext.length; i++) {
          var activeCallback = activeContext[i];
          activeCallback();
        }
    });

    var result = [];
    var ROOT = -1;
    function test(title, callBack){
        timing.start || timing();
        var data = {title:title, callBack: callBack};
        result.push({
          data:data,
          parent : ROOT,
          subNodess : null
        });


    }
    base.test = test;
}) (bat);
