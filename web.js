var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    parser = new require('xml2json'),
    fs = require('fs');

app.listen(8000);

function handler(req, res) {
    fs.readFile(__dirname + '/client.html', function(err, data) {
	if (err) {
	    console.log(err);
	    res.writeHead(500);
	    return res.end('Error loading client.html');
	}
	res.writeHead(200);
	res.end(data);
    });
}

io.sockets.on('connection', function(socket) {
    setInterval(function() {
	console.log('in a callback')
	var json = JSON.parse('{"data":"hello"}')
	socket.volatile.emit('notification', json);
    }, 2000)
});

