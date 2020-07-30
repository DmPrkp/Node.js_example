const fs = require('fs');
let buf = fs.readFile(process.argv[2], 'utf8', (err, data) => {
    if (err) {
        console.log("file not found")
    } else {
        console.log(data.split("\n").length - 1)
    }
})