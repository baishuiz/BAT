
;(function (bat) {
    var base = bat.base;

    var wait = {
    	URLChange : function(timeout){
    		// 此处用 beacon.once 会丢失后续case
            beacon.on("url change", function(){
            	setTimeout(function(){
            		alert("BAT::CASEDONE!!");
            	},1000)

            });
    	}
    }

    base.wait = wait;
}) (bat);
