;(function (bat) {
    var base = bat.base;

    var timeout = 20 * 1000
    function log(msg){
        alert(msg);
    }

    function dom(selector){

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
      	            alert(".")
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
              	    	log("事件执行" + eventName)
              	    	beacon(target).on(eventName);
              	    	// setTimeout(function(){
              	    	// 	alert('caseDone!')
              	    	// },1000)
              	    	//console.log('caseDone!')
              	    	console.log('BAT::CASEDONE')

              	    });
              },

              value : function(value){
                    starWait(selector, function(target){
                      log("填写value" + value)
                      target.value = value;
                      beacon(target).on("change");
                      console.log('BAT::CASEDONE')

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

      				console.log('BAT::CASEDONE')
          	    });
              }
          }
          return then;
    }

    base.dom = dom;
}) (bat);
