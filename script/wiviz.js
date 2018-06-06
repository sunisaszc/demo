const firebase = require("firebase");
var rootRef = firebase.app("secondary").database().ref();
var path = require("path");
const moment = require("moment");
const fs = require('fs');

function start() {
  let files = fs.readdirSync('./asset/wiviz/');
  files.forEach(file => {
    readwiviz('./asset/wiviz/'+file)
  });
}

start()
setInterval(start, 10 * 1000)

function readwiviz (path){
  let contents = fs.readFileSync(path, 'utf-8');
  let h = []
  let data = []
  let idx_mac = 0
  for (let i = contents.indexOf("h.mac"); i >= 0; i = contents.indexOf("h.mac", i + 1)) {
    h[idx_mac] = []
    //console.log(contents.substr(i+9,17))
    h[idx_mac][0] = contents.substr(i + 9, 17)
    idx_mac++
  }

  let idx_rssi = 0
  for (let i = contents.indexOf("h.rssi"); i >= 0; i = contents.indexOf("h.rssi", i + 1)) {
    //console.log(i + " p "+contents.indexOf(";",i))
    let range = contents.indexOf(";", i) - i - 9
    //console.log(contents.substr(i+9,range))
    h[idx_rssi][1] = contents.substr(i + 9, range)
    idx_rssi++
  }

  let idx_type = 0
  for (let i = contents.indexOf("h.type"); i >= 0; i = contents.indexOf("h.type", i + 1)) {
    //console.log(i + " p "+contents.indexOf(";",i))
    let range = contents.indexOf(";", i) - i - 11
    //console.log(contents.substr(i+10,range))
    h[idx_type][2] = contents.substr(i + 10, range)
    idx_type++
  }

  for (let i = 0; i < h.length; i++) {
    let body = {
      mac: h[i][0],
      rssi: h[i][1],
      type: h[i][2]
    }
    data.push(body)
  }

  console.log(data)

  let time = moment().format("h:mm:ss a")
  let date = moment().format("MMM Do YY")
  data.forEach(i => {
    if(i.type == "sta"){
      firebaseapp(i.mac,i.rssi,time,date)
    }
  });
  fs.unlinkSync(path);
}

function firebaseapp(mac_v,rssi_v,time_v,date_v) {
  rootRef.push({ mac: mac_v, rssi : rssi_v, time : time_v,date : date_v })
}