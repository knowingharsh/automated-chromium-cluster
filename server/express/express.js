var bodyParser = require('body-parser');

module.exports = function (app) {
  const allowCrossDomain = function (req, res, next) {
    if (req.method === 'OPTIONS') {
      //for preflighted requests i.e cross domain post request coming with customer req header
      var headers = {};
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST,GET,PUT,DELETE,OPTIONS";
      //headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, Accept";
      res.writeHead(200, headers);
      res.end();
    } else {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
      next();
    }
  };

  app.use(allowCrossDomain);
  app.use(bodyParser.json({ limit: '50mb', extended: true })); // support json encoded bodies
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // support encoded bodies

}