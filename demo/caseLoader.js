var webPage = require('webpage');
var page    = webPage.create();
// var Bat     = require('./batDemo.js');
var fs      = require('fs');

var caseContent = [];

// 读取 Beacon
//caseContent.push(fs.read('../libs/beacon.0.2.3.mini.js'));

// 读取Bat
//caseContent.push(fs.read('./batDemo.js'));

// 调用 Case
// caseContent.push(fs.read('./case/testCase.js'));
//var thecase = fs.read('./case/testCase.js');


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
        //cc.push(' alert(location.href); if(url == location.href) {alert("BAT::NEEDNEXT"); }');
        newCase[index] = "function(){" + cc.join(";") + "}";
    };



    return newCase;
}



function runCase (){
    if (caseList.length<=0) return;
	var currentCase = caseList.shift();
	var url = page.url;
	page.evaluateJavaScript(currentCase);
	
	setTimeout(function(){
		if(url === page.url){
			runCase();
		}		
	},3000)


}


page.onAlert = function(msg){
	console.log(msg);
	if(msg==="BAT::URLCHANGED") {
        runCase();
	}
}

function urlChangeHandle(){
	page.injectJs('../libs/beacon.0.2.3.mini.js');
	page.injectJs('./batDemo.js');	
	console.log("ok!!!!!!");
	runCase();
}

page.onUrlChanged = urlChangeHandle;

//var theCase = 'function(){' + caseContent.join(";;;") + '}';

page.injectJs('../libs/beacon.0.2.3.mini.js');
page.injectJs('./batDemo.js');
 var caseList = loadCase();
 runCase();
