bat.test("城市选择", function(){
  bat.test("国内酒店", function(){
    bat.open("http://m.ctrip.com/html5/hotel");
	  bat.dom(".js_title").content("国内/海外酒店");
		bat.dom("#js_city").on("click");
		bat.dom('.ui-view-60 cui-tab-current').content('国内城市');
  });

  bat.test("海外酒店", function(){
		bat.open("http://m.ctrip.com/html5/hotel");
		bat.dom(".js_title").content("国内/海外酒店");
		bat.dom("#js_city").on("click");
		bat.dom('.ui-view-60 cui-tab-current').content('国内城市');
		bat.dom('.ui-view-60 data-key=["2"]').content('海外城市');
		bat.dom('.ui-view-60 data-key=["2"]').on('click');
  });
});

bat.test("本地定位", function(){});
