const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const db = require('./db');
const app = express();
const port = 5001;

const todoController = require('./controllers/todo');
const userController = require('./controllers/user');
const commentController = require('./controllers/comment');

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
    res.locals.username = req.session.username;
    res.locals.errorMessage = req.flash('errorMessage');
    next();
});

app.post('/todos', todoController.newTodo);
app.get('/todos', todoController.getAll);
app.get('/todos/:id', todoController.get);
app.get('/', commentController.index);

function redirectBack(req, res) {
    res.redirect('back');
}

app.get('/login', userController.login);
app.post('/login', userController.handleLogin, redirectBack);
app.get('/logout', userController.logout);
app.get('/register', userController.register);
app.post('/register', userController.handleRegister, redirectBack);

app.post('/comments', commentController.add);
app.get('/delete_comments/:id', commentController.delete);
app.get('/update_comments/:id', commentController.update);
app.post('/update_comments/:id', commentController.handleUpdate);

app.listen(port, () => {
    db.connect();
    console.log(`Example app listening on port ${port}`);
});
