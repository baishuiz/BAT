//Bat.test("选择城市", function(){
	Bat.open("http://m.ctrip.com/");
    Bat.the(document.location.href).is("http://m.ctrip.com/html5/");
	Bat.dom("a[title='酒店']").on("click");
	Bat.dom(".js_title").content("国内/海外酒店");
	Bat.dom("#js_city").on("click");
	Bat.dom('li[data-cityid="1"]').content("北京")
	Bat.dom(".js_title").content("选择城市");
	// // // Bat.content("上海").on("click");
	 Bat.dom('li[data-cityid="1"]').on("click");
	 Bat.dom(".js_city_title").content("北京");
//})