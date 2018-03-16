let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let messageLog = [];

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('new user connected');
  if(messageLog.length !== 0) {
    console.log('sending backlog');
    socket.emit('message backlog', messageLog);
  }

  socket.on('disconnect', function() {
    console.log('user disconnected');
    socket.broadcast.emit('chat message','user disconnected');
  });

  socket.on('login', function(user) {
    socket.broadcast.emit('chat message', user + ' connected');
  });

  socket.on('chat message', function(user, msg) {
    console.log('msg: ' + msg);
    messageLog.push({user, msg});
    io.emit('chat message', user + ': ' + msg);
  });
});

http.listen(8000, function(){
  console.log('listening on localhost:8000');
});
