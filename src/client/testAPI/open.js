;(function (bat) {
    var base = bat.base;

    function open(url){
      window.location = url;
    	console.log("BAT::WAITURL");
    }

    base.open = open;
}) (bat);
