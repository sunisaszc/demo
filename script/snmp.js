const firebase = require("firebase");
var rootRef = firebase.database().ref();
const moment  = require("moment");
var snmp = require('snmp-native');
import session from 'express-session';


function snmpapp() {

    // Create a Session with explicit default host, port, and community.
    var session = new snmp.Session({ host: '192.168.1.1', port: 161, community: 'public' });
    session.getSubtree({ oid: [1, 3, 6, 1, 4, 1, 2021, 255] }, function (error, varbinds) {
        let data = []
        if (error) {
            console.log('Fail :(');
        } else {
            console.log(varbinds)
            varbinds.forEach(function (vb) {
                let newchar = '.'
                let iso = vb.oid
                iso = iso.toString()
                iso = iso.split(',').join(newchar);

                let idx = iso.lastIndexOf(".");
                let tmp = idx
                idx = iso.substr(idx + 1, iso.lenght)
                console.log('Name of interface ' + idx)
                
                console.log('iso : ' + iso);
                
                tmp = iso.substr(0,tmp)
                let type = tmp.lastIndexOf(".");
                type = tmp.substr(type + 1, tmp.lenght)
                console.log("type: "+type)

                if(type == 1){
                    data[idx-1] = new Array(2)
                }else if (type == 4) {
                    let mac = vb.valueHex
                    mac = mac.replace(/(.{2})/g, "$1:")
                    mac = mac.substr(0, 17)
                    console.log('value mac : ' + mac)
                    data[idx-1][0] = mac
                }else if (type == 13) {
                    console.log('value noise: ' + vb.value)
                    let noise = vb.value
                    data[idx-1][1] = noise
                } else if(type == 26){
                    console.log('value snr: ' + vb.value)
                    let snr = vb.value
                    data[idx-1][2] = snr
                    //data[idx-1].push(obj)
                }
            });
        }
        console.log(data)
        console.log( moment().format("h:mm:ss a") )
        let time = moment().format("h:mm:ss a")
        console.log( moment().format("MMM Do YY") )
        let date = moment().format("MMM Do YY")
        for(let i = 0;i < data.length ; i++){
                let mac = data[i][0]
                let noise = data[i][1]
                let snr = data[i][2]
                let rssi = snr+noise
                
                firebaseapp(mac, noise, snr , rssi , time, date)
        }
        session.close();
    });
}

snmpapp()
setInterval(snmpapp, 30 * 1000)


function firebaseapp(mac_v,noise_v,snr_v,rssi_v,time_v,date_v) {
    rootRef.push({ mac: mac_v, noise: noise_v,snr : snr_v,rssi : rssi_v, time : time_v,date : date_v })
}