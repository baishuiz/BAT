var timeout = 20 * 1000
var Bat = function(){
     alert("Bat is comming!!")   
}

var currentURL = location.href;

var _historyPushState  =  history.pushState;
window.history.pushState = function(json,title,url){
    beacon.on("url change");
    //alert("BAT URL Change to:" + url);
    //_historyPushState.apply(window, arguments)
    _historyPushState.call(window.history,json,title,url)
    //alert("BAT::URLCHANGED");
}


// setInterval(function(){
// 	if(location.href != currentURL) {
// 		currentURL = location.href
// 		alert("BAT URL Change:" + location.href)
// 		alert("BAT::URLCHANGED");
// 	}
// }, 300)

function needNext() {
	if(location.href == currentURL) {
        return true;
	} else {
		return false;
	}
}


var cmdStack = [];

var popStack = function() {
    cmdStack.shift()();	
}

function log(msg){
    alert(msg);
}


beacon.on("BAT::PageLoaded", popStack);

Bat.open = function( url ){
	window.location = url;
}

Bat.the = function(target){
    var proxy = {
    	is : function(expect) {
            var result =  (target === expect);
            log(" the is run")
            log(result)
        	alert('caseDone!')
            return result;
    	}
    }
	return proxy;
}


Bat.dom = function(selector) {

    function hasTarget(selector){
    	var target = document.querySelector(selector);
    	return target ;
    }

    function starWait(selector , then){
	    var result;
        var start = new Date();

        function waitit() {
        	
            var target = hasTarget(selector);

            if(target){
                wait && stopWait(wait);
                then && then(target);
            }
            return target           	
        }

	    if(!waitit()){
		    var wait = setInterval(function(){
	            waitit();
	            var now = new Date();
	            if(now - start >= timeout) {
	            	clearInterval(wait);
	            	log("超时！！！")
	            }
		    }, 200);    
		}
    }

    function stopWait(wait) {
    	clearInterval(wait);
    }



    var then = {
        on : function(eventName){
        	    starWait(selector, function(target){
        	    	//log("事件执行" + eventName)
        	    	beacon(target).on(eventName);
        	    	alert('caseDone!')
        	    });
        },

        content : function(txt) {
        	//log(txt)
    	    starWait(selector, function(target){
    	    	var content = target.innerText.replace(/^\s+|\s+$/ig,"");
    	    	var result =   content === txt;
    	    	//log("*****************")
    	    	log(content + " vs " + txt)
    	    	log(result)
    	    	log("*****************")

				alert('caseDone!')
    	    });        	
        }
    }
    return then;
}




Bat.content = function(txt){
	var result;
	var myEles = document.getElements('*');
	for(var i=0; i<myEles.length; i++){
	    if(myEles[i].innerHTML == txt){
	        result = myEles[i];
	    }
	}

    Bat.dom(result)
	return Bat.dom(result);
}

window.onpopstate=function() {
	//alert("URL 变化了！！！！！！！！！！")
}

Bat.wait = {
	URLChange : function(timeout){
		// 此处用 beacon.once 会丢失后续case
        beacon.on("url change", function(){
        	setTimeout(function(){
        		log("caseDone!");	
        	},1000)
        	
        });
	}
}

