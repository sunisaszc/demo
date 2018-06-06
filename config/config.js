// create new file ./config/config.js (1)
module.exports = require('./env/' + process.env.NODE_ENV + '.js');

