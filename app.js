const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO  = require('socket.io')(server); //hello I am new

const LISTEN_PORT = 8080; //make sure greater than 3000. Some ports are reserved/blocked by firewall ...

app.use((express.static(__dirname + '/public'))); //set root dir to the public folder

// routes
app.get('/player', function(req,res) {
    res.sendFile(__dirname + '/public/player.html');
});

app.get('/top-down', function(req,res) {
    res.sendFile(__dirname + '/public/top-down.html');
});

// websocket stuff
socketIO.on('connection', function(socket) {
    console.log(socket.id + ' has connected!');

    socket.on('disconnect', function(data) {
        console.log(socket.id + ' has disconnected');
    });

    socket.on('readPos', function(data) {
        //console.log(data);
        socketIO.sockets.emit('writePos', data);
    });
    socket.on('readPos2', function(data) {
        //console.log(data);
        socketIO.sockets.emit('writePos2', data);
    });

    // write camera switch countdown to player file
    socket.on('setCountdown', function(data){
        socketIO.sockets.emit('writeCountdown', data);
    });

    socket.on('changeColour', function(data){
        socketIO.sockets.emit('writeColour', data);
    });

    socket.on('changeVisibility', function(data){
        socketIO.sockets.emit('writeVisibility', data);
    });

    // event for watcher winning
    socket.on('watcherWin', function(){
        socketIO.sockets.emit('groundLose');
    });

    // event for watcher winning
    socket.on('spawnPrompt', function(data){
        socketIO.sockets.emit('spawnPowerup', data);
    });
});

// start server
server.listen(LISTEN_PORT);
console.log('listening to port: ' + LISTEN_PORT);