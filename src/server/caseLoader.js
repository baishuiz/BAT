var webPage = require('webpage');
var page    = webPage.create();
var fs      = require('fs');
var config  = {
                debug : true
              }

page.settings.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4';
var caseContent = [];


var injectJs = {
  BAT : './libs/bat.0.1.1.js'
};



var caseStack = {
	plan   : [],
	runing : [],
	done   : []
}



page.onError = function(msg, trace) {
  var msgStack = ['ERROR: ' + msg];
  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
    });
  }
  config.debug && console.error(msgStack.join('\n'));
};


page.onCallback = function(data) {
  if(data.parseOrderOver) {
    parseCase(data.parseOrderOver.subNodes,-1, function(subNodeIndex){

      console.log(JSON.stringify(caseStack.plan))
    })
  }
}

function loadCase(){
    // 解析 case 执行顺序
    page.evaluate(function(){
        beacon.once(bat.events.ooo, function(eventObj, data){
             window.callPhantom({
               parseOrderOver : data
             })
        });
    });

    page.injectJs('../../demo/case/testCase.js');
}


var tree = {
  createNode : function(activeCase, parentID, data){

    // append node to tree
    var activeNode = {
        data         : data,
        firstSub     : null,
        rightSibling : null,
        parent       : parentID
    };
    return activeNode;
  },

  insertNode : function(node){
    var nodeID = caseStack.plan.length;
    caseStack.plan.push(node);
    return nodeID;
  }
}

function parseCase(data, parentID, callBack) {
  var subNodes = [];
  for(var i=0; i<data.length; i++) {
    var activeCase = data[i];
    console.log(data.length)
    console.log(activeCase.subNodes.length,'**')
    if(activeCase.subNodes.length>0) {

      // append node to tree
      var cmd = "bat.log(" + activeCase.data.title + ")"
      var activeNode = tree.createNode(activeCase, parentID, cmd);
      activeNodeId = tree.insertNode(activeNode);

      // record index of subNode
      console.log(activeNodeId, "888888888888888888888888888")
      subNodes.push(activeNode);

      // parse subNodes
      parseCase(activeCase.subNodes, activeNodeId, function(subNodeIndex){
          caseStack.plan[activeNodeId].firstSub = subNodeIndex[0];
          console.log(subNodeIndex[0],"************************")
      });

      console.log(subNodes.length,7777777777777777)
      if(subNodes[i-1]){
        console.log("9999999999999999999999999999999999")
        subNodes[i-1].rightSibling = activeNodeId;
      }

    } else {




      var cases = _loadCase(activeCase.data.callBack);

      // append node to tree
      var cmd = "bat.log(" + activeCase.data.title + ")"
      var activeNode = tree.createNode(activeCase, parentID, cmd);
      activeNodeId = tree.insertNode(activeNode);

      // record index of subNode
      console.log(activeNodeId, "888888888888888888888888888")
      subNodes.push(activeNode);
      
      console.log(subNodes.length,7777777777777778)
      if(subNodes[i-1]){
        console.log("99999999999999999999999999999999910")
        subNodes[i-1].rightSibling = activeNodeId;
      }


      var tempCaseList = [];
      for (var caseIndex = 0; caseIndex < cases.length; caseIndex++) {

        // append node to tree
        var action = cases[caseIndex];
        var activeNode = tree.createNode(activeCase, activeNodeId, action);
        var nodeID = tree.insertNode(activeNode);

        tempCaseList.push(activeNode);
        if(tempCaseList[caseIndex-1]){
         tempCaseList[caseIndex-1].rightSibling = nodeID;
        }
      }
      //caseStack.plan.concat(_loadCase)
    }

  }

console.log(subNodes,"666666666666666")
  callBack && callBack(subNodes);
}

function _loadCase(activeCase){
  var caseList = activeCase.split("\n") || [];
  var newCase = caseList.filter(function(element){
      var reg = /(^\s*\/\/)|(^\s*$)/;
      return !reg.test(element);
  });


  var result = [];
  for (var index = 0; index < newCase.length; index++) {
      var activeLine = newCase[index];
      activeLine = activeLine.replace(/\r|\n/g,"").replace(/^\s+/,'');
      newCase[index] = "function(){" + activeLine + "}";
  };

  return newCase;
}


function runCase (){
	if (caseStack.plan.length<=0) return;
	tryRunCase();
}


function tryRunCase(){
	if(caseStack.runing.length<=0){
        caseStack.runing.push(caseStack.plan.shift());
        page.evaluateJavaScript(caseStack.runing[0]);
	}
}


page.onAlert = function(msg){
	switch (msg) {
		default :
		    console.log(msg);
		    break;
	}
}


function urlChangeHandle(){
	page.injectJs(injectJs.BAT);
	runCase();
}





page.onConsoleMessage = function(msg, lineNum, sourceId) {

	switch (msg) {
        case "BAT::CASEDONE" :
        	nextStep();
            break;
        case "BAT::WAITURL" :
            waitURL(page.url);
            break;
        default :
            break;
	}
};

function waitURL(oldURL){
    page.onLoadFinished = function(status) {
    	page.onLoadFinished = function(){};
        nextStep(true);
    }
}


function nextStep(urlChange) {
    setTimeout(function(){
        // 輸出Case清單
        var doneCase = caseStack.runing.shift();
		    doneCase && caseStack.done.push(doneCase);
        console.log("case總數",caseStack.count,";剩餘Case:", caseStack.plan.length, ";已運行:", caseStack.done.length);

        // 輸出當前頁面截圖
        page.render("case"+caseStack.done.length + ".png")

        // 執行下一個case
        urlChange
        ? urlChangeHandle()
        : runCase();

    },3000);
}




// 初始化
page.injectJs(injectJs.BAT);
loadCase();
// caseStack.count = caseStack.plan.length;
// console.log('开始执行')
// runCase();
