const http = require('http');
const server = http.createServer((request, response)=>{        
    response.writeHead(404, {'Content-Type':'text/html'});
    response.write('<h1>Hello</h1>');
    response.end('<h1>Bye</h1>'); 
}).listen(8080);