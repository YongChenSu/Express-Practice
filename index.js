const express = require('express');
const app = express();
const port = 5001;

app.get('/', (req, res) => {
    res.send('hello');
});

app.get('/hello', (req, res) => {
    res.send('hello man');
});

app.get('/bye', (req, res) => {
    res.send('yo man');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
