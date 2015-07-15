// require module
var net   = require('net');
var http  = require('http');
var buffer = new Buffer(0);

// config
var config = {
                localPort : 8772
             };

var Event = {
	proxy : new String("Air_proxy")
}

// middleware
var middleware = {
	loadTestCase : function (requestHead, client, server){
        // test start
        if(requestHead.url === "http://m.ctrip.com/webapp/hotel/"){
            var pass = true;
        }
        // test end

        var bodyCache = new Buffer(0);
        var txt = "<script>alert(1680)</script>";   // test data for debug
        server.on('data', function(data){ 
            
            var responseData = httpHelper.parseHttp(data);

            if(responseData.index>=0 && pass) {
                var head = responseData.head.toString('utf8');
                var body = responseData.body;

                // fix content-length  
                var reg = /(content-length:\s)(\d+)/i;
                var headFix  = head.replace(reg, function(headString, key, value){
                    var len = value*1 + txt.length;
                    return key + len;
                });

                // response head
                client.write(new Buffer(headFix, 'utf8'));

                // cache response body
                //cacheBody(body);
                client.write(body)
            } else {
                //cacheBody(data);
                client.write(data);
            }
        });    

        function cacheBody(data){
            bodyCache = buffer.add(bodyCache, data);
        }


        server.on('end', function(){
            // load content script to test
            bodyCache = buffer.add(bodyCache, new Buffer(txt, 'utf8'));
            client.write(bodyCache);
            server.destroy();
        });   
	}
};             


// buffer helper
var buffer = {
    add : function (buf1, buf2) {
        var result = new Buffer(buf1.length + buf2.length);
        buf1.copy(result);
        buf2.copy(result,buf1.length);
        return result;
    }
};


// client
var clientHelper = {
	onData : function(data){
        var HTTPString  = data.toString('utf8');
        var HTTPData    = httpHelper.parseHttp(data);
        var head        = HTTPData.head;
        var body        = HTTPData.body;
        var client      = this;
        var headData    = httpHelper.parseHead(head);
        
        if(!head) return false;
        client.pause();
        client.removeAllListeners('data');
        var request = !headData.isConnect ? 
                         httpHelper.clearHead(HTTPData) : 
                         data;


        client.emit(Event.proxy, headData, request);
	},


    
	onProxy : function(headData, requestData){
        var client = this;
        var server = net.connect({
            port : headData.port,
            host : headData.host,
            allowHalfOpen : false
        });



        //client.on('data', function(data){ server.write(data)});
        //client.on('end', function(data){ console.log("client end");})
        middleware.loadTestCase(headData, client, server);

    client.once("error", function(err){
        console.log("client err!! by2");
        console.log(err, requestData)
    });
        
        headData.isConnect ?
             client.write(new Buffer("HTTP/1.1 200 Connection established\r\nConnection: close\r\n\r\n")):
             server.write(requestData);

        client.resume();
	}
}


var httpHelper = {
    parseHead  : function (data){
        var HTTPString       = data.toString('utf8');
        var isConnectRequest = (/^connect/i).test(HTTPString);
        var result =  isConnectRequest ? 
                   httpHelper.parseConnectRequest(HTTPString) : 
                   httpHelper.parseOtherRequest(HTTPString);
        return result;           
    },
 
    parseConnectRequest : function(data){
        var reg = /(\w+)\s([^:]*):(\d*)\s(HTTP\/[\d\.]+)/;
        var result = data.match(reg) || [];
        return {
        	isConnect: true,
        	method   : result[1],
        	host     : result[2],
        	port     : result[3] || 80,
        	httpVar  : result[4]
        }
    },

    parseOtherRequest : function(data){
        var reg = /(\w+)\s(([^:]*):\/\/([^:\/]*)+(\d*)\/*(.*))\s(HTTP\/[\d\.]+)/;
        var result = data.match(reg) || [];
        return {
        	method   : result[1],
        	protocol : result[3],
            url      : result[2],
        	host     : result[4],
        	port     : result[5] || 80,
        	path     : result[6],
        	httpVar  : result[7]
        } 
    },

    parseHttp : function (data){

        // \r = 0x0d ; \n = 0x0a
        
        var index = -1;
        for(var i=0,len=data.length-3;i<len;i++)
        {
            if (data[i] == 0x0d && data[i+1] == 0x0a && data[i+2] == 0x0d && data[i+3] == 0x0a)
            {
                index = i+4;
            }
        }
      
        var result = {
            index  : index,
            head   : index>=0 && data.slice(0, index),
            body   : index>=0 ? data.slice(index) : data
        }
        
        return result;
        
    },

    clearHead : function(HTTPData){
        var head = HTTPData.head.toString('utf8')
        head = head.replace(/(proxy\-)?connection\:.+\r\n/ig,'')
                    .replace(/Keep\-Alive\:.+\r\n/i,'')
                    .replace("\r\n",'\r\nConnection: close\r\n');

        var result =  buffer.add(new Buffer(head), HTTPData.body);
        return result;
    }
}

// proxyer
var proxyer = {
    start : function(request, response){
        var server = net.creatConnection(request, response);

    }
};

// create server
var server = net.createServer(function(client){
    // listen requist Data
    client.on("data", clientHelper.onData);

    client.on(Event.proxy, clientHelper.onProxy);
    
});
server.maxConnections = 1;
server.listen(config.localPort);

//处理各种错误
process.on('uncaughtException', function(err){
    console.log("\nError!!!!");
    console.log(err);
});