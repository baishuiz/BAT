// API 完整性测试
describe("API 完整性", function(){
    it("bat.test", function(){
        expect(bat.test).toBeDefined();
    });
})


describe("Bat.test", function(){
    it("识别嵌套顺序", function(done){
        beacon.once(bat.events.ooo, function(eventObj, data){
              data = JSON.parse(data);
              console.log(2)
              console.log(data)
              data = data.subNodes
              var firstCase  = data[0];
              var secondCase = data[1];

              expect(firstCase.data.title).toBe("预订流程");
              expect(secondCase.data.title).toBe("查询流程");

              var first_sub0 = firstCase.subNodes[0];
              expect(first_sub0.data.title).toBe("预订流程.sub");

              var first_sub0_sub0 = first_sub0.subNodes[0];
              var first_sub0_sub1 = first_sub0.subNodes[1];
              //expect(first_sub0_sub0.data.callBack()).toBe("预订1ok");
              expect(first_sub0_sub0.data.title).toBe("预订流程.sub.sub0");
              //expect(first_sub0_sub1.data.callBack()).toBe("预订2ok");
              expect(first_sub0_sub1.data.title).toBe("预订流程.sub.sub1");

              var secondCase_sub = secondCase.subNodes[0];
              expect(secondCase_sub.data.title).toBe("查询流程.sub");

              done();
        })

        bat.test("预订流程", function(){

          bat.test("预订流程.sub", function(){

              bat.test("预订流程.sub.sub0", function(){
                  return "预订1ok"
              })

              bat.test("预订流程.sub.sub1", function(){
                  return "预订2ok"
              })
          })
        });

        bat.test("查询流程", function(){
          bat.test("查询流程.sub", function(){
             return "查询流程ok"
          })
        });

        bat.test("查询流程2", function(){
          bat.test("查询流程2.sub", function(){
             return "查询流程2ok"
          })
        });
    });
})


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
