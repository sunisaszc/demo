const firebase = require("firebase");
var rootRef = firebase.app("secondary").database().ref();
var path = require("path");
const moment = require("moment");
const fs = require('fs');

exports.read = (req, res) => {
  rootRef.once('value')
    .then(function(dataSnapshot) {
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
        res.render((path.join(__dirname + '/../views/wiviz.html')), { 
          data: alldata , time : moment().format("MMM Do YY h:mm:ss a") , title : "Wiviz - Router"});
    });
}

exports.macPage = (req, res) => {
  let mac = req.params.mac
  rootRef.once('value')
  .then(function(dataSnapshot) {
    //console.log(dataSnapshot.val())
    let data = dataSnapshot.val()
    let alldata = []
    //console.log(data)
    for (let event in data) {
      let dataCopy = data[event];
      if(dataCopy.mac == mac)
        alldata.unshift(dataCopy)
      //console.log(dataCopy)
    }      
      //res.send(alldata)
      res.render((path.join(__dirname + '/../views/wiviz.html')), { 
        data: alldata , time : moment().format("MMM Do YY h:mm:ss a") , title : "Wiviz - Router\nMac : "+mac});
  });
}