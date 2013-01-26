Pinitto.me HTTP Proxy
======================

Proxy for pinitto.me's services.

Utilising Nodejitsu's ```node-http-proxy``` to pass all requests on port 80 and 443 through to another node process. 

Code also comes with Nodejitsu's ```forever``` as a dependency with ```npm start```, ```npm stop```, ```npm restart``` as possible commands to control the running of the process. Logs are located in the ```./logs``` subdirectory.

!Build Status(https://travis-ci.org/pinittome/proxy.png)(https://travis-ci.org/pinittome/proxy)

* http://nodejitsu.com/
* https://github.com/nodejitsu/node-http-proxy
* https://github.com/nodejitsu/forever
