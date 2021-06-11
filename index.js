const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const db = require('./db');
const app = express();
const port = 5001;

const todoController = require('./controllers/todo');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
    })
);
app.use(flash());
// 自己新增 middleware
app.use((req, res, next) => {
    // 設定給 view 用的全域變數是 res.locals
    // 拿 session 或是 flash 則都是 req
    res.locals.isLogin = req.session.isLogin || false;
    res.locals.errorMessage = req.flash('errorMessage');
    next();
});

app.post('/todos', todoController.newTodo);
app.get('/todos', todoController.getAll);
app.get('/todos/:id', todoController.get);
app.get('/', todoController.addTodo);

app.get('/login', (req, res) => {
    res.render(
        'login'
        // 若使用 locals 以下可省略
        // , {
        //     // 將 error message 的參數傳入
        //     errorMessage: req.flash('errorMessage'),
        // }
    );
});

app.post('/login', (req, res) => {
    if (req.body.password === 'abc') {
        // req.session 可讀可寫
        req.session.isLogin = true;
        res.redirect('/');
    } else {
        // req.flash 對 key 寫 value
        req.flash('errorMessage', 'Please Input Correct Password');
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    req.session.isLogin = false;
    res.redirect('/');
});

app.listen(port, () => {
    db.connect();
    console.log(`Example app listening on port ${port}`);
});
