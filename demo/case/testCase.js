// bat.test("城市选择", function(){
//   bat.test("国内酒店", function(){
//     bat.open("http://m.ctrip.com/html5/hotel");
// 	  bat.dom(".js_title").content("国内/海外酒店");
// 		bat.dom("#js_city").on("click");
//     bat.wait.URLChange();

// 		bat.dom('.cui-tab-current').content('国内城市');
//   });

//   bat.test("海外酒店", function(){
// 		bat.open("http://m.ctrip.com/html5/hotel");
// 		bat.dom(".js_title").content("国内/海外酒店");
// 		bat.dom("#js_city").on("click");
//     bat.wait.URLChange();

// 		bat.dom('.cui-tab-current').content('国内城市');
// 		bat.dom('li[data-key="2"]').content('海外城市');
// 		bat.dom('li[data-key="2"]').on('click');
//     //bat.wait.URLChange();

//   });
// });

//  bat.test("本地定位", function(){
//    bat.open("http://m.ctrip.com/html5/hotel");
//  });


bat.test("test_input_value", function(){
    bat.open("http://www.baidu.com");
	bat.dom("#kw").value("HI Air");
})