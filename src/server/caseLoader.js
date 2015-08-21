var webPage = require('webpage');
var page    = webPage.create();
var fs      = require('fs');

// base config info
var config  = {
  debug : true,
  userAgent : 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4'
}

var injectJs = {
  BAT : './libs/bat.0.1.1.js'
};

var casePath = '../../demo/case/testCase.js';  // TODO ： 修改为从命令行参数接收

var caseStack = {
	plan   : [],
	runing : [],
	done   : []
}

page.settings.userAgent = config.userAgent;

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

  // run case
  if(data.parseOrderOver) {
    parseCase(data.parseOrderOver.subNodes, -1, function(subNodeIndex){
      runCase();
    })
  }
}

// 解析 case 嵌套结构
function parseStructure(){
    page.evaluate(function(){
        beacon.once(bat.events.ooo, function(eventObj, data){
             window.callPhantom({
               parseOrderOver : data
             })
        });
    });

    page.injectJs(casePath);
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
  var firstSubIndex ;
  for(var i=0; i<data.length; i++) {
    var activeCase = data[i];
    // console.log(data.length)
    // console.log(activeCase.subNodes.length,'**')
    if(activeCase.subNodes.length>0) {

      // append node to tree
      var cmd = "function(){bat.log('" + activeCase.data.title + "')}"
      var activeNode = tree.createNode(activeCase, parentID, cmd);
      activeNodeId = tree.insertNode(activeNode);
      firstSubIndex = firstSubIndex || activeNodeId
      // record index of subNode
      subNodes.push(activeNode);

      // parse subNodes
      parseCase(activeCase.subNodes, activeNodeId, function(firstSubIndex){
          activeNode.firstSub = firstSubIndex;
      });

      if(subNodes[i-1]){
        subNodes[i-1].rightSibling = activeNodeId;
      }

    } else {




      var cases = _loadCase(activeCase.data.callBack);

      // append node to tree
      var cmd = "function(){bat.log('" + activeCase.data.title + "')}"
      var activeNode = tree.createNode(activeCase, parentID, cmd);
      activeNodeId = tree.insertNode(activeNode);
      firstSubIndex = firstSubIndex || activeNodeId




      // record index of subNode
      subNodes.push(activeNode);

      if(subNodes[i-1]){
        subNodes[i-1].rightSibling = activeNodeId;
      }


      var tempCaseList = [];
      var cmdid=""
      for (var caseIndex = 0; caseIndex < cases.length; caseIndex++) {

        // append node to tree
        var action = cases[caseIndex];
        var activeAction = tree.createNode(activeCase, activeNodeId, action);

        var nodeID = tree.insertNode(activeAction);
        cmdid = cmdid || nodeID

        tempCaseList.push(activeAction);
        if(tempCaseList[caseIndex-1]){
         tempCaseList[caseIndex-1].rightSibling = nodeID;
        }
      }
      activeNode.firstSub = cmdid;
    }

  }

  callBack && callBack(firstSubIndex);
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

function isAllDone(){
  var allDone = !caseStack.plan.activeAction && caseStack.done.length > 0;
  return allDone;
}

function runCase (){
  if(isAllDone()){
    return
  }

  caseStack.plan.activeAction = caseStack.plan.activeAction || caseStack.plan[0];
  caseStack.runing.push(caseStack.plan.activeAction);
  page.evaluateJavaScript(caseStack.runing[0].data);
  next();

}

function next(){

  var nextID;
  if(caseStack.plan.activeAction.firstSub) {
    nextID = caseStack.plan.activeAction.firstSub;
    caseStack.plan.activeAction.firstSub = null;
    caseStack.plan.activeAction = caseStack.plan[nextID];
  } else if(caseStack.plan.activeAction.rightSibling){
    nextID = caseStack.plan.activeAction.rightSibling;
    caseStack.plan.activeAction.rightSibling = null;
    caseStack.plan.activeAction = caseStack.plan[nextID];
  } else {
    caseStack.plan.activeAction = caseStack.plan[caseStack.plan.activeAction.parent];
    isAllDone() || next();
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
        console.log("case總數",caseStack.plan.length,";剩餘Case:", caseStack.plan.length-caseStack.done.length, ";已運行:", caseStack.done.length);

        // 輸出當前頁面截圖
        page.render("case"+caseStack.done.length + ".png")


        // 執行下一個case
        urlChange
        ? urlChangeHandle()
        : runCase();

    },3000);
}

function init(){
  // 初始化
  page.injectJs(injectJs.BAT);
  parseStructure();
  // caseStack.count = caseStack.plan.length;
  // console.log('开始执行')
  // runCase();
}

init();
