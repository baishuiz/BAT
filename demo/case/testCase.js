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


// bat.test("预订流程", function(){
//
//   bat.test("预订流程.sub", function(){
//
//       bat.test("预订流程.sub.sub0", function(){
//           return "预订1ok"
//       })
//
//       bat.test("预订流程.sub.sub1", function(){
//           return "预订2ok"
//       })
//   })
// });
//
// bat.test("查询流程", function(){
//   bat.test("查询流程.sub", function(){
//      return "查询流程ok"
//   })
// });
//
// bat.test("查询流程2", function(){
//   bat.test("查询流程2.sub", function(){
//      return "查询流程2ok"
//   })
// });
