const db = require('../db');

const commentModel = {
    add: (username, comment, cb) => {
        db.query(
            'insert into comments(username, content) values(?, ?)',
            [username, comment],
            (error, results) => {
                if (error) return cb(error);
                cb(null);
            }
        );
    },

    getAll: (cb) => {
        db.query(
            `SELECT U.nickname, C.content
                FROM comments as C
                LEFT JOIN users as U on U.username = C.username
                ORDER BY C.id DESC
            `,
            (error, results) => {
                if (error) return cb(error);
                cb(null, results);
            }
        );
    },
};

module.exports = commentModel;
