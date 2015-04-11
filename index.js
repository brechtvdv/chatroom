var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/',function(req, res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

io.on('connection', function(socket){
    socket.on('name', function(nickname){
      console.log(nickname + ' has connected');
      io.emit('chat message', nickname + ' just joined the chatroom.');
    });
    socket.on('disconnect', function(){
        console.log('user just got disconnected');
        io.emit('chat message', 'user just got disconnected');
        });
    socket.on('chat message', function(data){
        console.log(data.nickname + ': ' + data.msg);
        io.emit('chat message', data.nickname + ": " + data.msg);
    });
});
