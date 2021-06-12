const commentModel = require('../models/comment');

const commentController = {
    index: (req, res) => {
        commentModel.getAll((error, results) => {
            if (error) console.log(error);

            res.render('index', {
                comments: results,
            });
        });
    },

    add: (req, res) => {
        const { username } = req.session; // 因為已經登入有 username
        const { content } = req.body;

        if (!username || !content) {
            return res.redirect('/');
        }

        commentModel.add(username, content, (error) => {
            return res.redirect('/');
        });
    },

    delete: (req, res) => {
        // 要檢查是否有該文章，故傳 req.session.username
        commentModel.delete(req.session.username, req.params.id, (error) => {
            res.redirect('/');
        });
    },

    update: (req, res) => {
        commentModel.get(req.params.id, (error, result) => {
            res.render('update', {
                comment: result,
            });
        });
    },

    handleUpdate: (req, res) => {
        // 權限管理
        commentModel.update(
            req.session.username,
            req.params.id,
            req.body.content,
            (error) => {
                return res.redirect('/');
            }
        );
    },
};

module.exports = commentController;
