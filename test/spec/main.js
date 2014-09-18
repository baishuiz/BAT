describe("beacon.once", function(){
    it("普通事件侦听与触发", function(){
       var testResult = 0;
       var CUSTOM_EVENT = beacon.createEvent("custom event");
       beacon.once(CUSTOM_EVENT, function(){
           testResult++;
       })
       
       expect(testResult).toEqual(0);
       
       // 第一次触发
       beacon.on(CUSTOM_EVENT);
       expect(testResult).toEqual(1);
       
       // 第二次触发
       beacon.on(CUSTOM_EVENT);
       expect(testResult).toEqual(1);
       
    });
});