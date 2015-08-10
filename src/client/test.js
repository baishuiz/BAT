;(function (bat) {
    var base = bat.base;

    // 初始化跟數據
    var subTree = {
      data     : {title:"root", callBack: null},
      parent   : null,
      subNodes : []
    };

    var root = subTree;
    //caseLoad(root);

    function loadSub(nodes, context) {
      var activeCase = nodes.shift();
      if(activeCase){
        subTree = activeCase;

        beacon(context).once(bat.events.over, function(){
            loadSub(nodes, context);
        });

        lookAt();
        activeCase.data && activeCase.data.callBack();
      } else {
        if(nodes.length==0 && context.data.title=="root"){
          //beacon.on(bat.events.ooo, JSON.stringify(root));
          //beacon.on(bat.events.ooo, root);
          sendResult(root.subNodes);
        } else {
          beacon(context.parent).on(bat.events.over);
        }

      }
    }

    function sendResult(result){
      console.log(result.length);
      for(var i =0, len= result.length; i<len; i++) {
          var activeItem = result[i];
          delete activeItem.parent;
          //console.log("activeItem.parent")
          if(activeItem.subNodes.length>0) {
          //  delete activeItem.data.callBack;
            sendResult(activeItem.subNodes);
          } else {
            activeItem.data.callBack = activeItem.data.callBack.toString().replace(/^function\(\){([\w\W]+?)}$/, "$1");
          }
      };
      if (result === root.subNodes) {
        beacon.on(bat.events.ooo, JSON.stringify(root));
      }
    }

    function caseLoad(context){
        var isOver = context.length===0;
        if(isOver) {
          beacon(context.parent).on(bat.events.over);
          return;
        }

        var nodes = context.subNodes.slice(0);
        loadSub(nodes, context);

    }

    function lookAt(){
      timing.started || timing();
      beacon(subTree).off(base.events.complete);
      beacon(subTree).once(base.events.complete, function(){
          var context = this;
          caseLoad(context);
      });
    }

    var timing = function(){
          timing.started = true;
          setTimeout(function(){
            timing.started = false;
            beacon(subTree).on(base.events.complete);
          },0);
    }


    var test = function (title, callBack){
      if(subTree == root){
          lookAt();
      }

      test = recordSubNode;
      recordSubNode(title, callBack);
    }

    function recordSubNode(title, callBack){
      subTree.subNodes.push({
        data     : {title: title, callBack: callBack},
        parent   : subTree,
        subNodes : []
      })
    }

    base.test = test;
}) (bat);
