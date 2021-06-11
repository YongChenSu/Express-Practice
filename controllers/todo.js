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
};

module.exports = todoController;
