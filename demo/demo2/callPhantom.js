var webPage = require('webpage');
var page    = webPage.create();

page.onCallback = function(data){
    // var result = data("666");
    // var sn = data.sn;

  //  console.log(result, sn);
  console.log(JSON.stringify(data))
}


//page.open('client_side.html');
console.log('statrt')

page.evaluate(function(){
    //function a(msg){return msg}
    var a = {say:function(msg){hi}}
    window.callPhantom(a);
})
