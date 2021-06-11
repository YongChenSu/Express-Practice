const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./db');
const app = express();
const port = 5001;

const todoController = require('./controllers/todo');

app.set('view engine', 'ejs');

// 要有 body-parser 才能處理 post 打過來的資料

// parse application/x-wwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application.json
app.use(bodyParser.json());

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
    })
);

app.post('/todos', todoController.newTodo);
app.get('/todos', todoController.getAll);
app.get('/todos/:id', todoController.get);
app.get('/', todoController.addTodo);

app.get('/login', (req, res) => {
    res.render('login');
});

// req.session, res.redirect
app.post('/login', (req, res) => {
    if (req.body.password === 'abc') {
        req.session.isLogin = true;
        res.redirect('/');
    } else {
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
