const http = require('http');
const fs = require('fs');

const header = "header.html";
const body = "body.html";
const footer = "footer.html";

http.createServer((requrest, response)=> {
    fs.readFile(header, 'utf8', (err, data)=>{
        if(err) {
            console.log('Could not find or open file for reading\n');
            response.statusCode = 404;
            response.end();
        } else {
            console.log(`The file ${header} is read and sent to the client\n`);
            response.writeHead(200, {'Content-Type':'text/html'});
            response.end(data);
        }
    });

    fs.readFile(body, 'utf8', (err, data)=>{
        if(err) {
            console.log('Could not find or open file for reading\n');
            response.statusCode = 404;
            response.end();
        } else {
            console.log(`The file ${body} is read and sent to the client\n`);
            response.writeHead(200, {'Content-Type':'text/html'});            
            response.end(data);
        }
    });

    fs.readFile(footer, 'utf8', (err, data)=>{
        if(err) {
            console.log('Could not find or open file for reading\n');
            response.statusCode = 404;
            response.end();
        } else {
            console.log(`The file ${footer} is read and sent to the client\n`);
            response.writeHead(200, {'Content-Type':'text/html'});
            response.end(data);
        }
    });
    
}).listen(8080);