const express = require('express');
const db = require('./db');
const app = express();
const port = 5001;

const todoController = require('./controllers/todo');

app.set('view engine', 'ejs');

// express 預設不解析 post delete，也就是不解析 request body，也沒有 session 管理機制，故需倚靠 middleware
app.use((req, res, next) => {
    console.log('Time', new Date());
    next(); // 若是 res.end() 會直接結束，故改用 next()，把控制權交給下一個 middleware
});

// 權限管理
function checkPermission(req, res, next) {
    if (req.query.admin === '1') {
        next();
    } else {
        return res.end('Error');
    }
}

// 若是以下註解的寫法，所有路由都會被影響到
// app.use(checkPermission);

// 可將 function 加在一個路由，僅該路由會受影響
app.get('/todos', checkPermission, todoController.getAll);
app.get('/todos/:id', todoController.get);

// 但有內建 query 的 middleware
app.get('/test', (req, res) => {
    console.log(req.query);
});

app.listen(port, () => {
    db.connect();
    console.log(`Example app listening on port ${port}`);
});
