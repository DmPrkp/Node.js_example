const http = require ('http');


console.clear()
http.get(process.argv[2], (res)=>{
    res.setEncoding('utf8');
    res.on('data', function(data) {
        console.log(data)
    })
})

////answer of autor////////////////////////////////////////////////////////////

'use strict'
const http = require('http')

http.get(process.argv[2], function (response) {
  response.setEncoding('utf8')
  response.on('data', console.log)
  response.on('error', console.error)
}).on('error', console.error)