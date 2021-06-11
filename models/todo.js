// db = connection
const db = require('../db');

// 從資料庫拿資料一定要用 callback function 拿資料，使其變成非同步
const todoModel = {
    getAll: (cb) => {
        db.query('SELECT * from todos', (error, results) => {
            if (error) return cb(error);
            // cb 第一個參數是有沒有錯誤，第二個才是真正的結果
            cb(null, results);
        });
    },

    get: (id, cb) => {
        // 因是字串拼接，可用 ? 避免 SQL Injection，下一個參數給陣列，? 會被 id 取代
        db.query('SELECT * from todos where id = ?', [id], (error, results) => {
            if (error) return cb(error);
            cb(null, results);
        });
    },
};

module.exports = todoModel;
