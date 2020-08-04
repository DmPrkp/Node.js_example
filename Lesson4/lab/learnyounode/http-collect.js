const http = require ('http');
let url = process.argv[2];
let body = "";

http.get(url, (res)=>{
    res.on('data', (chunk)=>{
        body+=chunk
    })
    res.on('end', ()=>{
        console.log(body.length)
        console.log(body)
    })
})
