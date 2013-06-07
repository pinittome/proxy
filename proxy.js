var fs = require('fs'),
    http = require('http'),
    https = require('https'),
    httpProxy = require('http-proxy')

environment = process.env.NODE_ENV || 'production'
config      = require('./config.' + environment)

var options = {
    https: {
        key: fs.readFileSync(config.ssl.key, 'utf8'),
        cert: fs.readFileSync(config.ssl.cert, 'utf8'),
        ca: config.ssl.ca ? fs.readFileSync(config.ssl.ca, 'utf8') : null,
        ciphers: 'ECDHE-RSA-AES256-SHA:AES256-SHA:RC4-SHA:RC4:HIGH:'
            + '!MD5:!aNULL:!EDH:!AESGCM',
        honorCipherOrder: true
    },
    enable: {
        xforward: true // enables X-Forwarded-For
    }
}

var proxy = new httpProxy.HttpProxy({
    target: {
        host: 'localhost', 
        port: config.app.port
    }, 
    enable: { xforward: true }
})

var listenOn = config.listen || [ 80, 443 ]

listenOn.forEach(function(port) {

    httpProxy.createServer(options, function (req, res) {
        proxy.proxyRequest(req, res)
    }).listen(port).on('upgrade', function (req, socket, head) {
        proxy.proxyWebSocketRequest(req, socket, head);
    })
})

console.log("Ready to proxy requests on port(s) " + listenOn.join(', ') + "...")
