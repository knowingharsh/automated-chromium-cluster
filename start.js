const path = require('path');
const conf = require('dotenv').config({ path: path.join(__dirname, '.env') });
console.log(conf);
//increase limit globally
require('./server/index');


