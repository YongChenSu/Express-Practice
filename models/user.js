// db = connection
const db = require('../db');

// 從資料庫拿資料一定要用 callback function 拿資料，使其變成非同步
const userModel = {
    // 傳進 user object
    add: (user, cb) => {
        db.query(
            'insert into users(username, password, nickname) values(?, ?, ?)',
            [user.username, user.password, user.nickname],
            (error, results) => {
                if (error) return cb(error);
                cb(null);
            }
        );
    },

    get: (username, cb) => {
        db.query(
            'SELECT * from users where username = ?',
            [username],
            (error, results) => {
                if (error) return cb(error);
                // 第二個參數是 user
                cb(null, results[0]);
            }
        );
    },
};

module.exports = userModel;
