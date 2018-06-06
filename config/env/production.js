// create new file ./config/env/development.js (2)
// and ./config/env/production.js (3)
module.exports = {
       //mongoUri: 'mongodb://localhost/myFirstNode',
       // or use 
       mongoUri: 'mongodb://admin:password@localhost:27017/TestDB1',
       debug: true,
       sessionSecret: 'dev_secret_key'
}