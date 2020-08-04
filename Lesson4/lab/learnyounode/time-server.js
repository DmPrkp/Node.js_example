'use strict'
let port = process.argv[2]
const net = require('net')

const server = net.createServer(function (socket) {
    let year = new Date().getFullYear();
    let month = new Date().getMonth()+1;
    month = addZero(month);
    let day = new Date().getDate();
    day = addZero(day);
    let min = new Date().getHours();
    min = addZero(min);
    let seconds = new Date().getUTCMinutes();
    seconds = addZero(seconds);
    socket.write(year +"-"+month+"-"+day+" "+ min+":"+seconds)
    socket.end("\n")
}).listen(port)

function addZero(val) {
    return (val < 10) ? "0"+val : val
}