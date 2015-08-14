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
    parseCase(data.parseOrderOver.subNodes,-1, function(){
      //console.log(JSON.stringify(caseStack.plan))
    })
  }
}

function loadCase(){
    // 解析 case 执行顺序
    page.evaluate(function(){
        beacon.once(bat.events.ooo, function(eventObj, data){
             alert(data.subNodes[0].subNodes[0].data.title)
             window.callPhantom({
               parseOrderOver : data
             })
        });
    });

    page.injectJs('../../demo/case/testCase.js');
}


function parseCase(data, parentID, callBack) {

  for(var i=0; i<data.length; i++) {
    var activeCase = data[i];
    // console.log(activeCase.data.title)
    // console.log(JSON.stringify(activeCase))
    if(activeCase.subNodes.length>0) {

      // append node to tree
      var activeNode = {
          data         : "bat.log("+ activeCase.data.title +")",
          firstSub     : activeCase.subNodes && activeCase.subNodes[0],
          rightSibling : data[i+1],
          parent       : activeCase.parent
      };
      var nextID = caseStack.plan.push(activeNode);
      // console.log(nextID)
      // console.log(caseStack.plan)

      parseCase(activeCase.subNodes, nextID, function(){

      });
    } else {
      var cases = _loadCase(activeCase.data.callBack);

      for (var caseIndex = 0; caseIndex < cases.length; caseIndex++) {
        batCase = cases[caseIndex];
        // append node to tree
        var activeNode = {
            data         : batCase,
            firstSub     : activeCase.subNodes && activeCase.subNodes[0],
            rightSibling : data[i+1],
            parent       : parentID
        };
        caseStack.plan.push(activeNode);
      }
      //caseStack.plan.concat(_loadCase)
    }
  }

  callBack && callBack();
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
      activeLine = activeLine.replace(/\r|\n/g,"");
      newCase[index] = "function(){" + activeLine + "}";
      console.log(newCase[index],"***")
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
