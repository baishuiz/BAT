;(function(bat){
    var 
        base   = bat.base,
        beacon = base.beacon
    ;
    
    var 
        wait = function(selector){
            var 
                callBack = function(e){ 
                    console.log("test wait done!",e);
                    //beacon(document).off("DOMNodeInsertedIntoDocument", callBack);
                    //beacon(document.body).off("DOMNodeInserted", callBack);
                    document.body.removeEventListener("DOMNodeInserted", callBack);
                }    
            ;
            //beacon(document).on("DOMNodeInsertedIntoDocument", callBack);
            //beacon(document.body).on("DOMNodeInserted", callBack);
            document.body.addEventListener("DOMNodeInserted", callBack);
        }
    ;    
    
    base.wait = wait;
})(bat);