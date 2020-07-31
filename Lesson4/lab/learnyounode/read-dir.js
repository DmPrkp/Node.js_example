const fs = require ("fs");
const path = require('path');

fs.readdir(process.argv[2], 'utf8', (err, list)=>{
    if (err) {
        console.log("No file there")
    } else {
        for (file of list) {
            if (path.extname(file) === '.'+process.argv[3]) {
                console.log(file)
            }
        }
    }
})