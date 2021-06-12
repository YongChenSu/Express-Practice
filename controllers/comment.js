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
};

module.exports = commentController;
