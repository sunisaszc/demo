const firebase = require("firebase");
var rootRef = firebase.database().ref();
var path = require("path");
const moment = require("moment");

exports.index = (req, res) => {
  rootRef.once('value')
    .then(function (dataSnapshot) {
      //console.log(dataSnapshot.val())
      let data = dataSnapshot.val()
      let alldata = []
      //console.log(data)
      for (let event in data) {
        let dataCopy = data[event];
        alldata.unshift(dataCopy)
        //console.log(dataCopy)
      }
      //res.send(alldata)
      res.render((path.join(__dirname + '/../views/index.html')), { 
        data: alldata, time: moment().format("MMM Do YY h:mm:ss a"), title: "SNMP - Router" });
    });
}

exports.macPage = (req, res) => {
  let mac = req.params.mac
  rootRef.once('value')
    .then(function (dataSnapshot) {
      //console.log(dataSnapshot.val())
      let data = dataSnapshot.val()
      let alldata = []
      //console.log(data)
      for (let event in data) {
        let dataCopy = data[event];
        if (dataCopy.mac == mac)
          alldata.unshift(dataCopy)
        //console.log(dataCopy)
      }
      //res.send(alldata)
      res.render((path.join(__dirname + '/../views/index.html')), { 
        data: alldata, time: moment().format("MMM Do YY h:mm:ss a"), title: "SNMP - Router\nMac : " + mac });
    });
}

exports.webSocket = (req, res) => {
  let mac = req.params.mac
  rootRef.on("value", function (snapshot) {
    //console.log(dataSnapshot.val())
    let data = snapshot.val()
    let alldata = []
    //console.log(data)
    for (let event in data) {
      let dataCopy = data[event];
      alldata.unshift(dataCopy)
      //console.log(dataCopy)
    }
    //res.send(alldata)
    res.render((path.join(__dirname + '/../views/index.html')), { data: alldata, time: moment().format("MMM Do YY h:mm:ss a"), title: "SNMP - Router" });
  });
}