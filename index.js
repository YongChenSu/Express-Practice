const express = require('express');
const app = express();
const port = 5001;

const todoController = require('./controllers/todo');

app.set('view engine', 'ejs');

// 若專案夠大，可考慮將路由移出
app.get('/todos', todoController.getAll);
app.get('/todos/:id', todoController.get);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
