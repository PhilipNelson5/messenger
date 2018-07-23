// messenger.socket = (function (socket) {
(function () {
  let user = prompt("Please enter your name", "name");

  socket.on('connect', function() {
    socket.emit('login', user);
  });

  $('form').submit(function(){
    socket.emit('chat message', user, $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('chat message', function(user, msg) {
    let messages = document.getElementById('message-div');
    $('#messages').append($('<li>').text(user, msg));
    messages.scrollTop = messages.scrollHeight;
  });

  socket.on('message backlog', function(backlog) {
    console.log(backlog);
    let msgs = $('#messages');
    for(let msg of backlog)
      msgs.append($('<li>').text(msg.user + ': ' + msg.msg));
  });
  console.log('loaded messenger');
}());
