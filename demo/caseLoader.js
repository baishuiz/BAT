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
    var activeCase = fs.read('./case/testCase.js');
    var caseList = activeCase.split("\r\n") || [];
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
	//var currentCase = caseStack.plan.shift();
	tryRunCase();
}


function tryRunCase(){
	// console.log(caseStack.plan[0])
	// console.log(caseStack.runing.length)
	// console.log(caseStack.runing[0])
	if(caseStack.runing.length<=0){
        caseStack.runing.push(caseStack.plan.shift());
        page.evaluateJavaScript(caseStack.runing[0]);

	}

}


page.onAlert = function(msg){
	switch (msg) {
		case  "caseDone!" :
			var doneCase = caseStack.runing.shift();
			doneCase && caseStack.done.push(doneCase);
			runCase();
	        break;
		default :
		    console.log(msg);
		    break;
	}
}


function urlChangeHandle(targetURL){
	page.injectJs('../libs/beacon.0.2.3.mini.js');
	page.injectJs('./batDemo.js');	
	runCase();
}



page.onLoadFinished = function(status) {
  //console.log('Status: ' + status, page.url);
  var doneCase = caseStack.runing.shift();
  doneCase && caseStack.done.push(doneCase);
  urlChangeHandle()
};



// 初始化
page.injectJs('../libs/beacon.0.2.3.mini.js');
page.injectJs('./batDemo.js');
caseStack.plan = loadCase();
runCase();



