;(function (bat) {
    var base = bat.base;
    var events = {
      complete : beacon.createEvent('complete'),
      over : beacon.createEvent('over')
    }


    var result = [];
    var activeContext = result;


    var timing = function(){
          timing.start = true;
          setTimeout(function(){
            timing.start = false;
            beacon.on(events.complete);
          },0);
    }


    beacon.on(events.complete, function(){
        var parentContext = activeContext;
        for (var i = 0; i < parentContext.length; i++) {
          activeContext = parentContext[i];
          try{
              activeContext.data.callBack();
          } catch(err){
              console.log(err);
          }
        }
        activeContext.parent === result && beacon.on(events.over, result);
    });


    function test(title, callBack){
        timing.start || timing();
        var data = {title:title, callBack: callBack};
        var context = activeContext.subNodes || activeContext;
        context.push({
          data:data,
          parent : activeContext,
          subNodes : []
        });
    }

    test.events = events;
    base.test = test;
}) (bat);
