var webPage = require('webpage');
var page    = webPage.create();
var fs      = require('fs');


page.settings.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4';
var caseContent = [];


var caseStack = {
	plan : [],
	runing : [],
	done : []
}



page.onError = function(msg, trace) {
  var msgStack = ['ERROR: ' + msg];
  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
    });
  }
  console.error(msgStack.join('\n'));
};


function loadCase(){
    var activeCase = fs.read('../../demo/case/testCase.js');
    var caseList = activeCase.split("\n") || [];
		// console.log(caseList)
    var newCase = caseList.filter(function(element){
        var reg = /(^\s*\/\/)|(^\s*$)/;
        return !reg.test(element);
    });


    var result = [];
    for (var index = 0; index < newCase.length; index++) {
        var cc = [];
        cc.push(newCase[index]);
        newCase[index] = "function(){" + cc.join(";") + "}";
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
	page.injectJs('../../libs/beacon.0.2.3.mini.js');
	//page.injectJs('./batDemo.js');
  page.injectJs('../../demo/demo1/batDemo.js');
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
    	console.log("url 88888")
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
page.injectJs('../../libs/beacon.0.2.3.mini.js');
page.injectJs('../../demo/demo1/batDemo.js');
caseStack.plan = loadCase();
caseStack.count = caseStack.plan.length;
console.log('开始执行')
runCase();
