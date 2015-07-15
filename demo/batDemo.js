var timeout = 20 * 1000
var Bat = function(){
     alert("Bat is comming!!")   
}

var currentURL = location.href;

setInterval(function(){
	if(location.href != currentURL) {
		currentURL = location.href
		alert(location.href)
		alert("BAT::URLCHANGED");
	}
}, 300)

function needNext() {
	if(location.href == currentURL) {
        alert("BAT::NEEDNEXT");
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
            alert(result);
            return result;
    	}
    }
	return proxy;
}


Bat.dom = function(selector) {

    function hasTarget(selector){
    	var target = document.querySelector(selector);
    	return target;
    }

    function starWait(selector , then){
	    var result;
        // 超时，清除等待
	    var timeoutId = setTimeout(function(){
    		clearInterval(wait);
    		alert("超时")
    	}, timeout);

	    var wait = setInterval(function(){
            var target = hasTarget(selector);
            if(target){
            	clearTimeout(timeoutId);
                stopWait(wait);
                then && then(target);
            }   
	    }, 300);    
	    

    }

    function stopWait(wait) {
    	clearInterval(wait);
    }



    var then = {
        on : function(eventName){
        	    starWait(selector, function(target){
        	    	beacon(target).on(eventName);
        	    });
        },

        content : function(txt) {

        	    starWait(selector, function(target){
        	    	var content = target.innerHTML.replace(/^\s+|\s+$/ig,"")
        	    	var result =   content === txt;
        	    	log(txt);
        	    	log(content);
        	    	log(result)
        	    	log("******************")
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

