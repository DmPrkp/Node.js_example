const http = require ('http');


console.clear()
http.get(process.argv[2], (res)=>{
    res.setEncoding('utf8');
    res.on('data', function(data) {
        console.log(data)
    })
})
