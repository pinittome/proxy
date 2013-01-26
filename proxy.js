var fs = require('fs'),
    http = require('http'),
    https = require('https'),
    httpProxy = require('http-proxy'),
    config = require('./config');

var options = {
    https: {
        key: fs.readFileSync(config.ssl.key, 'utf8'),
        cert: fs.readFileSync(config.ssl.cert, 'utf8')
    },
    enable : {
        xforward: true // enables X-Forwarded-For
    }
};

var proxy = new httpProxy.HttpProxy({
    target: {
        host: 'localhost', 
        port: config.app.port
    }, 
    enable: { xforward: true }
});

httpProxy.createServer(options, function (req, res) {
    proxy.proxyRequest(req, res)
}).listen(443).on('upgrade', function (req, socket, head) {
    proxy.proxyWebSocketRequest(req, socket, head);
});

httpProxy.createServer(function (req, res) { 
    proxy.proxyRequest(req, res)
}).listen(80).on('upgrade', function(req, socket, head) {
    proxy.proxyWebSocketRequest(req, socket, head);
});


