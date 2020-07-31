const http = require('http');
let fs = require('fs');
let path = require('path');
let mimeTypes = {
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.css': 'text/css',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.mp4': 'video/mp4'
};

http.createServer((req, res) => {
    let pathname, extname, mimeType;
       

    if (req.url === '/') pathname = 'site/index.html';
    else pathname = 'site' + req.url;
    extname = path.extname(pathname);
    mimeType = mimeTypes[extname];

    if (extname === '.mp4') {
        if (!fs.existsSync(pathname)) {
            console.log('there is no file here!\n');
            res.statusCode = 404;
            res.end();
            return null;
        }

        let responseHeaders = {};
        let stat = fs.statSync(pathname);
        let rangeRequest = readRangeHeader(req.headers['range'], stat.size);

        if (rangeRequest == null) {
            res.Headers['Content-Type'] = mimeType;
            res.Headers['Content-Length'] = stat.size;
            res.Headers['Accept-Ranges'] = 'bytes';

            let video = fs.readFileSync(pathname);
            console.log(`The file ${pathname} is read and sent to the client\n`);
            res.writeHead(200, responseHeaders);
            res.end(video);
            return null;
        }

        let start = rangeRequest.start;
        let end = rangeRequest.end;

        if (start >= stat.size || end >= stat.size) {
            responseHeaders['Content-Range'] = 'bytes*/' + stat.size;
            console.log("Return the 416 'Requested Range Not Satisfiable'");
            res.writeHead(416, responseHeaders);
            res.end();
            return null;
        }
        let maxsize = 102400;

        if (end - start >= maxsize) { end = start + maxsize - 1; }

        responseHeaders['Content-Range'] = 'bytes ' + start + '-' + end + '/' + stat.size;
<<<<<<< HEAD
        responseHeaders['Content-Length'] = start == end ? 0 : (end - start + 1);
=======
>>>>>>> 483bab22abbc30fb56bc51ff79f7873f3c1bd158
        responseHeaders['Content-Type'] = mimeType;
        responseHeaders['Accept-Ranges'] = 'bytes';
        responseHeaders['Cache-Control'] = 'no-cache';

        const fd = fs.openSync(pathname, 'r');

        let buf = Buffer.alloc(responseHeaders['Content-Length']);

        fs.read(fd, buf, 0, buf.length, start, (err, bytes) => {
            if (err) {
                console.log(err);
                res.statusCode = 500;
                res.end();
            } else {
                res.writeHead(206, responseHeaders);               
                res.end(buf);
            }
        });
    } else {
        fs.readFile(pathname, 'utf8', (err, data) => {
            if (err) {
                console.log('Could not find or open file for reading\n');
                res.statusCode = 404;
                res.end();
            } else {
                console.log(`The file ${pathname} is read and sent to the client\n`);
                res.writeHead(200, {
                    'Content-Type': mimeType
                });
                res.end(data);
            }
        });
    }
}).listen(8080, () => {
    console.log("It's works \n");
});
