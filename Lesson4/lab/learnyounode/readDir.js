const fs = require (fs);
let type = '.'+process.argv[3];

fs.readdir(process.argv[2], 'utf8', (err, data)=>{
    if (err) {
        console.log("No file there")
    } else {
        
    }
})