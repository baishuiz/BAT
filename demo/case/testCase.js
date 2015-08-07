//Bat.test("选择城市", function(){
	// Bat.open("http://m.ctrip.com/html5/hotel");
	//
	// Bat.dom(".js_title").content("国内/海外酒店");
	// Bat.dom("#js_city").on("click");
	//
	// Bat.wait.URLChange();
	// Bat.dom(".js_title").content("选择城市");
	// Bat.dom('#TAG_without').content("我的位置");
	// Bat.dom('.js_hot_city li[data-cityid="1"]').content("北京");
	// Bat.dom('.js_hot_city li[data-cityid="1"]').on("click");
	//
	// Bat.wait.URLChange();
	// Bat.dom(".js_city_title").content("北京");
	// Bat.dom("#js_cko_date_left").content("7月24日");
	// Bat.dom("#js_submit").on("click");
	//
	// Bat.wait.URLChange();
	// Bat.dom(".ellips").content("地图");

//})


Bat.test("酒店查询", function(){
    Bat.test("国内酒店", function(){
       Bat.open("http://m.ctrip.com/html5/hotel");
		   Bat.dom(".js_title").content("国内/海外酒店");
			 Bat.dom("#js_city").on("click");
			 BAt.dom('.ui-view-60 cui-tab-current').content('国内城市');
    });

    Bat.test("海外酒店", function(){
			Bat.open("http://m.ctrip.com/html5/hotel");
			Bat.dom(".js_title").content("国内/海外酒店");
			Bat.dom("#js_city").on("click");
			BAt.dom('.ui-view-60 cui-tab-current').content('国内城市');
			BAt.dom('.ui-view-60 data-key=["2"]').content('海外城市');
			BAt.dom('.ui-view-60 data-key=["2"]').on('click');
    });
});
