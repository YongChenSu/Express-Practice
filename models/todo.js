const todos = ['1st todo', '2nd todo', '3rd todo'];

const todoModel = {
    getAll: () => {
        return todos;
    },

    get: (id) => {
        return todos[id];
    },
};

module.exports = todoModel;
