const fs = require('fs')
let buf = fs.readFileSync(process.argv[2]);
let strBuff = buf.toString();
let arr = strBuff.split("\n");
console.log(arr.length-1);

