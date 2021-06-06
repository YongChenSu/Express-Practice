##### [HackMD](https://hackmd.io/@oftDiwqGQqKh6ah7CkyFSQ/S1G_vkcqO)

# Express

## The Substructure of Express is http.createServer

### Make a HTTP server with Node.js

1. Create a JS file, such as index.js
2. require http and createServer

```javascript=
const http = require('http');
const server = http.createServer(handler);
```

3. Make handler function and listen to a port

    if url is "hello", show hello! with html h1 tag

    Some browser can parse html tags to show correct style without `"content type": "text/html"`

```javascript=
const http = require('http');
const server = http.createServer(handler);

function handler(req, res) {
    if (req.url === '/hello') {
        res.write('<h1>hello!</h1>');
    } else {
        res.write('invalid url');
    }

    res.end();
}

server.listen(5001);
```

4. Open terminal and run `node index.js`
5. It can add other content type

```javascript=
// index.js
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

```

<br>

## References

-   [要學框架，先從不用框架開始](https://lidemy.com/courses/390625/lectures/8554270)

###### tags: `程式導師實驗計畫第四期`
