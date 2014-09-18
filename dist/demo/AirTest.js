/*
 * @desc:  全局配置
 * @param: baseURI : 被测试页面入口
 * @param: logServer : 日志服务地址
 * @param: timeout : 页面加载超时时间，单位毫秒
 */

Air.config = {
    baseURI : "localhost/webapp/hotel/",
    logServer : "http://git.airair.me",
    tiemout : 10000
}


var URL = {
    root : "/",
    cityList : "/citylist"
}


Air.test("国内酒店预订流程", function() {
    
    Air.goTo(URL.root);
    Air.page(URL.root).test("进入酒店查询页", function() {
        var title = Air.get("#headerview h1").innerHTML;
        Air.the(title).is("国内/海外酒店");

        // 选择城市
        var cityHandle = Air.get("#js_city");
        Air.let(cityHandle).on("click");
        Air.page.is(URL.cityList);

    });

    Air.page.wait("#headerview").test("进入城市列表页选择城市", function() {
        
        var title = Air.get("#headerview h1").innerHTML;
        Air.the(title).is("选择城市");

        // 选择上海
        var cityItem = Air.get(".cui-city-n .current");
        Air.let(cityItem).on("click");
        Air.page.is(URL.root);
    });        
     

    Air.page(URL.root).test("选择城市后返回酒店查询页", function() {     

        var cityHandle = Air.get("#js_city");
        var currentcity = cityHandle.innerHTML;
        Air.the(currentcity).is("上海");

        // 查询酒店
        var submitBtn = Air.get("#js_submit");
        Air.let(submitBtn).on("click");
    });



    // 选择酒店
    Air.page("shagnhai2").has("#searchlist").test("酒店查询页", function() {     

        var currentcity = cityHandle.innerHTML;
        Air.the(currentcity).is("上海");


        // 选择酒店
        var submitBtn = zpote("#js_submit");
        Air.let(submitBtn).on("click");
    });



    // 选择房间
    Air.test("酒店查询页", "#detail", function(){     

        var currentcity = cityHandle.innerHTML;
        Air.the(currentcity).is("上海");


        // 选择房间
        var submitBtn = zpote("#js_submit");
        Air.let(submitBtn).on("click");
    });
    

    // 填写订单
    Air.test("订单填写页", "#booking", function(){     

        // 验证登录状态

        // 验证早餐明细

        // 验证入离日期

        // 验证入住人

        // 填写手机

        // 验证话术

        // 提交订单

    });

});