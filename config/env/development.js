// create new file ./config/env/development.js (2)
// and ./config/env/production.js (3)
module.exports = {
    //mongoUri: 'mongodb://localhost/myFirstNode',
    // or use 
    mongoUri: 'mongodb://admin:password@localhost:27017/TestDB1',
    debug: true,
    sessionSecret: 'dev_secret_key',
    google: {
        clientID: '981323105775-jr5m0mc1u2c4t4hm7nrm6ke8pqqd91cq.apps.googleusercontent.com',
        clientSecret: 'd1RBi4VH7_jrmV0s2DBI-kEE',
        callbackURL: 'http://localhost:3000/oauth/google/callback'
    }
}