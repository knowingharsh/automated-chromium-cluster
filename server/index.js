const express = require('express');
const app = express();
const path = require('path');

console.log('static path at: ', path.join(__dirname, process.env.SERVER_STATIC_PATH))
app.use(express.static(path.join(__dirname, process.env.SERVER_STATIC_PATH)))
var http = require('http');
// express configuration 
require('./express/express')(app);
// routes registration
require('./routes/routes')(app);
// server creation
var httpServer = http.createServer(app);
httpServer.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, function () {
  const host = httpServer.address().address;
  const port = httpServer.address().port;
  console.log('Node Server listening at http://%s:%s', host, port);
});
