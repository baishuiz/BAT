;(function (bat) {
    var base = bat.base;

    function log(msg){
      console && console.log(msg);
      console.log('BAT::CASEDONE')
    }

    base.log = log;
}) (bat);
