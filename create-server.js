const http = require('http');
const server = http.createServer(handler);

function handler(req, res) {
    if (req.url === '/hello') {
        res.write('<h1>hello!</h1>');
    } else if (req.url === '/hello-with-html-content-type') {
        res.writeHead(200, {
            'Content-Type': 'text/html',
        });

        res.write('<h1>hello-with-html-content-type!</h1>');
    } else if (req.url === '/plaintext') {
        res.writeHead(200, {
            'Content-type': 'text/plaintext',
        });

        res.write('<h1>Plait text</h1>');
    } else if (req.url === '/google') {
        res.writeHead(301, {
            Location: 'https:google.com',
        });
    } else if (req.url === '/bye') {
        res.write('bye');
    } else {
        res.write('invalid url');
    }

    res.end();
}

server.listen(5001);
