const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const saltRound = 10;

const userController = {
    get: (req, res) => {},

    login: (req, res) => {
        res.render('user/login');
    },

    handleLogin: (req, res, next) => {
        const { username, password } = req.body;
        if (!username || !password) {
            req.flash('errorMessage', '啊 4 不會填好逆');
            return next();
        }

        userModel.get(username, (error, user) => {
            if (error) {
                req.flash('errorMessage', error.toString());
                return next();
            }

            if (!user) {
                req.flash('errorMessage', '使用者不存在');
                return next();
            }

            // 確定拿到  user 之後，檢查密碼是否正確
            bcrypt.compare(password, user.password, (error, isSuccess) => {
                if (error || !isSuccess) {
                    req.flash('errorMessage', '密碼錯誤');
                    return next();
                }

                req.session.username = user.username;
                res.redirect('/');
            });
        });
    },

    register: (req, res) => {
        res.render('user/register');
    },

    handleRegister: (req, res, next) => {
        const { username, password, nickname } = req.body;
        if (!username || !password || !nickname) {
            // early return 避免多層結構
            req.flash('errorMessage', '缺少必要欄位');
            return next();
        }

        // 非同步
        bcrypt.hash(password, saltRound, (error, hash) => {
            if (error) {
                req.flash('errorMessage', error.toString());
                return next();
            }

            userModel.add(
                {
                    username,
                    // 請 bcrypt 把 password hash 後的值 (hash)，當作密碼寫進去
                    password: hash,
                    nickname,
                },
                (error) => {
                    // cb function 回傳錯誤回來
                    if (error) {
                        req.flash(
                            'errorMessage',
                            `使用者名稱 ${username} 已被註冊`
                        );
                        return next();
                    }

                    // 註冊成功的話，以有 username 代表成功
                    req.session.username = username;
                    res.redirect('/');
                }
            );
        });
    },

    logout: (req, res) => {
        req.session.username = null;
        res.redirect('/');
    },
};

module.exports = userController;
