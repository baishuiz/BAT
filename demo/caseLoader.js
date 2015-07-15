var webPage = require('webpage');
var page    = webPage.create();
var Bat     = require('./batDemo.js');
var fs      = require('fs')


// 读取Bat
var bat = fs.read('./batDemo.js');

// 调用 Case
var caseContent = fs.read('./case/testCase.js');

page.onAlert = function(msg){
	console.log(msg);
}

var theCase = 'function(){' + bat + caseContent + '}';

page.open('about:blank', function(){
    page.evaluateJavaScript(theCase);	
})




