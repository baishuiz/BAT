var webPage = require('webpage');
var page    = webPage.create();
// var Bat     = require('./batDemo.js');
var fs      = require('fs');


page.settings.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4';

var caseContent = [];

// 读取 Beacon
//caseContent.push(fs.read('../libs/beacon.0.2.3.mini.js'));

// 读取Bat
//caseContent.push(fs.read('./batDemo.js'));

// 调用 Case
// caseContent.push(fs.read('./case/testCase.js'));
//var thecase = fs.read('./case/testCase.js');

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



var resourceRequired = [];
var resourceReceived = [];

page.onResourceReceived = function(response) {
  resourceReceived.push(response.url);
  if(resourceRequired.join("") == resourceReceived.join("")) {
  	console.log("*****************资源加载完毕")
  	resourceRequired = [];
    resourceReceived = [];
  }
  //console.log('Response (#' + response.id + ', stage "' + response.stage + '"): ' + JSON.stringify(response));
};


page.onResourceRequested = function(requestData, networkRequest) {
  resourceRequired.push(requestData.url);
  //console.log('Request (#' + requestData.id + '): ' + JSON.stringify(requestData));
};



function loadCase(){
    var activeCase = fs.read('./case/testCase.js');
    var caseList = activeCase.split("\r\n") || [];
    var newCase = caseList.filter(function(element){
        var reg = /^\s*\/\//;
        return !reg.test(element);
    });


    var result = [];
    for (var index = 0; index < newCase.length; index++) {
    	
        var cc = [];
        //cc.push("var url = location.href;");
        cc.push(newCase[index]);
        //cc.push("alert('caseDone!')");
        //cc.push(' alert(location.href); if(url == location.href) {alert("BAT::NEEDNEXT"); }');
        newCase[index] = "function(){" + cc.join(";") + "}";
    };



    return newCase;
}



function runCase (){

	setTimeout(function(){


	    if (caseList.length<=0) return;
		var currentCase = caseList.shift();
		var url = page.url;
		console.log("运行Case: " , currentCase)
		page.evaluateJavaScript(currentCase);
		
		// setTimeout(function(){
		// 	if(url === page.url){
		// 		runCase();
		// 	}		
		// },3000)
	},300);


}


page.onAlert = function(msg){
	console.log(msg);
	if(msg==="BAT::URLCHANGED") {
        runCase();
	}

	if(msg==="caseDone!") {
        runCase();
	}	
}

function urlChangeHandle(targetURL){
	page.injectJs('../libs/beacon.0.2.3.mini.js');
	page.injectJs('./batDemo.js');	
	//console.log("URL Change To: ", targetURL);
	runCase();
}



page.onLoadFinished = function(status) {
  console.log('Status: ' + status, page.url);
  urlChangeHandle()
  // Do other things here...
};

//page.onUrlChanged = urlChangeHandle;

page.injectJs('../libs/beacon.0.2.3.mini.js');
page.injectJs('./batDemo.js');
 var caseList = loadCase();
 runCase();
