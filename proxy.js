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

https.createServer(options.https, function (req, res) {
    proxy.proxyRequest(req, res)
}).listen(443);

http.createServer(function (req, res) { 
    proxy.proxyRequest(req, res)
}).listen(80);
