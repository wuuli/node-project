'use strict';

let http = require('http');
let fs = require('fs');
let url = require('url');
let path = require('path');

let root = path.resolve(process.argv[2] || '.');

let server = http.createServer(function (request, response) {
    let pathname = url.parse(request.url).pathname;
    let filepath = path.join(root, pathname);
    fs.stat(filepath, function (err, stats) {
        if (!err && stats.isFile()) {
            console.log('200 ' + request.url);
            response.writeHead(200, {'Content-Type': 'text/plain;charset=UTF-8'});
            fs.createReadStream(filepath).pipe(response);
        } else {
            console.log('404 ' + request.url);
            response.writeHead(404);
            response.end('404 Not Found');
        }
    })
});

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');
