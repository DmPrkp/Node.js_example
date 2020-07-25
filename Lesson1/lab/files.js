const http = require('http');
const fs = require('fs');

const header = "header.html";
const body = "body.html";
const footer = "footer.html";
const textHtml = { 'Content-Type': 'text/html' };


http.createServer((requrest, response) => {

    fs.readFile(header, 'utf8', (err, data) => {
        if (err) {
            response.statusCode = 404;
            response.end();
        } else {
            response.writeHead(200,textHtml);
            response.write(data)
            
            fs.readFile(body, 'utf8', (err, data) => {
                if (err) {
                    response.statusCode = 404;
                    response.end();
                } else {
                    response.write(data)

                    fs.readFile(footer, 'utf8', (err, data) => {
                        if (err) {
                            response.statusCode = 404;
                            response.end();
                        } else {
                            response.end(data);
                        }
                    });
                }
            });
        }
    });


}).listen(8080);
