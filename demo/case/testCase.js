//Bat.test("选择城市", function(){
	Bat.open("http://m.ctrip.com/");
	Bat.dom("a[title='酒店']").on("click");
	
	Bat.wait.URLChange();
	Bat.dom(".js_title").content("国内/海外酒店");
	Bat.dom("#js_city").on("click");
	
	Bat.wait.URLChange();
	Bat.dom(".js_title").content("选择城市");
	Bat.dom('#TAG_without').content("我的位置");
	Bat.dom('.js_hot_city li[data-cityid="1"]').content("北京");
	Bat.dom(".js_title").content("选择城市");
	// // // // Bat.content("上海").on("click");
	 Bat.dom('.js_hot_city li[data-cityid="1"]').on("click");

	 Bat.wait.URLChange();
	 Bat.dom(".js_city_title").content("北京");
//})

