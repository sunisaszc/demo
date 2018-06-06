import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import session from 'express-session';
const firebase = require("firebase");

module.exports = function () {

    const app = express();

    if (process.env.NODE_ENV === "development") {
        app.use(morgan('dev'));
    }
    else {
        app.use(compression());
    }

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    var config = require('./config');
    app.use(session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitializeed: true
    }));

    var config = {
        apiKey: "AIzaSyD4i2NvJY-lDBpwj3BwT-qAAkK_3DP3MnA",
        authDomain: "snmp-25961.firebaseapp.com",
        databaseURL: "https://snmp-25961.firebaseio.com",
        projectId: "snmp-25961",
        storageBucket: "snmp-25961.appspot.com",
        messagingSenderId: "144165423105"
    };
    firebase.initializeApp(config);

    var secondaryAppConfig = {
        apiKey: "AIzaSyC-CcLgQafSNiPcwjtq2eZD5UI5IoYHZiM",
        authDomain: "wiviz-e8968.firebaseapp.com",
        databaseURL: "https://wiviz-e8968.firebaseio.com",
        projectId: "wiviz-e8968",
        storageBucket: "",
        messagingSenderId: "817222967585"
    };
    firebase.initializeApp(secondaryAppConfig, "secondary");

    var path = require("path");
    app.set('views', path.join(__dirname + '/../app/views/home.html'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'ejs');

    require('../script/snmp');
    require('../script/wiviz');
    require('../app/routes/index.route')(app);
    require('../app/routes/wiviz.route')(app);

    return app;
}