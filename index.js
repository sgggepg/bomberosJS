var cool = require('cool-ascii-faces');
var app = require('express')();
app.set('port', (process.env.PORT || 9000));
var server = require('http').Server(app);
var io = require('socket.io')(server);
var redis = require('redis');
var redisDoubleConnectionReseter = 0;
var redisServer = {
    host: 'redis-17428.c10.us-east-1-4.ec2.cloud.redislabs.com',
    port: 17428
};


io.on('connection', function(socket) {
    console.log('user connected');
    io.emit('user connected');
    socket.on('new Message', function(msg) {
        io.emit('new Message', msg);
    });
    socket.on('disconnect', function() {
        redisClient.quit();
    });
    var redisClient = redis.createClient(redisServer);
    redisClient.on("message", function(channel, message) {
        if (++redisDoubleConnectionReseter % 2 === 0) {
            return false;
        }
        try {
            console.log("mew message in queue " + message + "channel" + channel);
            io.emit('new Message', message);
        } catch (err) {

        }
    });
    redisClient.subscribe('message');

});


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');

});




server.listen((process.env.PORT || 9000), function() {
    console.log('listening on port *' + (process.env.PORT || 9000));
});