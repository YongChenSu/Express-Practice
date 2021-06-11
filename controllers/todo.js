const todoModel = require('../models/todo');

const todoController = {
    getAll: (req, res) => {
        todoModel.getAll((error, results) => {
            if (error) return console.log(err);
            res.render('todos', { todos: results });
        });
    },

    get: (req, res) => {
        const id = req.params.id;
        todoModel.get(id, (error, results) => {
            if (error) return console.log(error);
            res.render('todo', {
                // 因為單一個 todo 也是個陣列，所以要 index 0
                todo: results[0],
            });
        });
    },

    newTodo: (req, res) => {
        // 把新增的 todo 拿出來，content 就是 addTodo.ejs > form > input > name
        const content = req.body.content;
        todoModel.add(content, (error) => {
            if (error) return console.log(error);
            res.redirect('/todos');
        });
    },

    addTodo: (req, res) => {
        res.render(
            'addTodo'
            // 若使用 locals 以下可省略
            // , {
            //     isLogin: req.session.isLogin,
            // }
        );
    },
};

module.exports = todoController;
