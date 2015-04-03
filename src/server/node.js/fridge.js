// require module
var net   = require('net');
var http  = require('http');


// config
var config = {
                localPort : 8772
             };

var Event = {
	proxy : new String("Air_proxy")
}

// middleware
var middleware = {
	load : function (middleware){
        
	}
};             

// client
var clientHelper = {
	onData : function(data){
        var HTTPString  = data.toString('utf8');
        var header      = httpHelper.getHeader(HTTPString);
        var body        = HTTPString.replace(header,'');
        var client      = this;
        var requestData = httpHelper.parse(HTTPString);
        client.removeAllListeners('data');

        var request = !requestData.isConnect ? new Buffer(httpHelper.clearHeader(header, body)) : data;
        client.emit(Event.proxy, requestData, request);
	},

	onProxy : function(request, data){
        var client = this;
        var server = net.createConnection(request.port, request.host);
        client.on('data', function(data){ server.write(data)});
        server.on('data', function(data){ 

            client.write(data)
        });    
     
        request.isConnect ?
             client.write(new Buffer("HTTP/1.1 200 Connection established\r\nConnection: close\r\n\r\n")):
             server.write(data);
	}
}


var httpHelper = {
    parse  : function (data){
        var HTTPString       = data.toString('utf8');
        var header           = httpHelper.getHeader(HTTPString);
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
        var reg = /(\w+)\s([^:]*):\/\/([^:\/]*)+(\d*)\/*(.*)\s(HTTP\/[\d\.]+)/;
        var result = data.match(reg) || [];
        return {
        	method   : result[1],
        	protocol : result[2],
        	host     : result[3],
        	port     : result[4] || 80,
        	path     : result[5],
        	httpVar  : result[6]
        } 
    },

    getHeader : function (data){	
        var reg = /^.+/g;
        var result = data.match(reg)||[];
        return result[0];
    },

    clearHeader : function(header, body){
        header = header.replace(/(proxy\-)?connection\:.+\r\n/ig,'')
                    .replace(/Keep\-Alive\:.+\r\n/i,'')
                    .replace("\r\n",'\r\nConnection: close\r\n');
        return header + body;
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

server.listen(config.localPort);

//处理各种错误
process.on('uncaughtException', function(err)
{
    console.log("\nError!!!!");
    console.log(err);
});