module.exports = {                                                                         
    ssl: {                                                                                 
        key: './keys/ssl.key',                                                             
        cert: './keys/ssl.crt'
     /* ca: './keys/ssl.ca' */                                                             
    },                                                                                     
    app: {
        port: 3000
    },
    listen: [ 80, 443 ] /* optional */
}
