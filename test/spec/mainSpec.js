// API 完整性测试
describe("1.0 API", function(){
    it("全局配置 - Bat.config", function(){
        expect(Bat.config).toBeDefined();
    });

    it("运行测试用例", function(){
        expect(Bat.test).toBeDefined();
    });

    it("跳转页面", function(){
        expect(Bat.goto).toBeDefined()
    })

})


// describe("Bat.test", function(){
//     it("", function(){
//         bat.test(){
//           fsfsdf
//         }
//     })
// })


// 基础功能测试


/*
describe("Bat", function(){

    it("test()方法执行", function(done){
       var testResult = "";
       Bat.test("简单测试", function() {
           testResult = "ok";
           expect(testResult).toEqual("ok");
           done();
       });
    });


    it("测试", function(done){
        Bat.config = {
            baseURI : "../test",
            logServer : "http://git.airair.me",
            tiemout : 10000
        }

        expect(Bat.config.tiemout).toEqual(10000);

        Bat.config({
            baseURI : "../test",
            logServer : "http://git.airair.me",
            tiemout : 10000
        });
        var URL = {
            root : "main.html"
        };
        var page = Bat.goTo("../test/html/main.html");
        Bat.page(URL.root).wait("#main").test("标题", function() {
            var title = Bat.get("#headerview").innerHTML;
            var result = Bat.the(title).is("国内/海外酒店");
            expect(result).toEqual(true);
            expect(title).toEqual("国内/海外酒店");

            // 选择城市
            var cityHandle = bat.get("#js_city");
            Bat.let(cityHandle).on("click");
            Bat.page.is(URL.cityList);
            expect(Bat.page.location).toEqual(Bat.config.baseURI + URL.cityList);
            done();

        });

    })
});


*/
