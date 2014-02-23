var http = require('http');
var server = http.createServer();
var app = server.listen(8888);
var io = require('socket.io').listen(app);

var _clientID;
io.sockets.on('connection', function(client) {
	
	client.on('capture', function(data) {
		io.sockets.emit('capture', data);
	});
	client.on('hello', function(data) {
	});
	
});