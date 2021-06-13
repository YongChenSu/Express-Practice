const bcrypt = require('bcrypt');
const saltRound = 10;
const db = require('../models');
const User = db.User;

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

    User.findOne({
      where: {
        // username: username
        username,
      },
    })
      .then((user) => {
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
          req.session.userId = user.id;
          res.redirect('/');
        });
      })
      .catch((error) => {
        req.flash('errorMessage', error.toString());
        return next();
      });
  },

  register: (req, res) => {
    res.render('user/register');
  },

  handleRegister: (req, res, next) => {
    const { username, password, nickname } = req.body;
    if (!username || !password || !nickname) {
      req.flash('errorMessage', '缺少必要欄位');
      return next();
    }

    bcrypt.hash(password, saltRound, (error, hash) => {
      if (error) {
        req.flash('errorMessage', error.toString());
        return next();
      }

      User.create({
        username,
        password: hash,
        nickname,
      })
        .then((user) => {
          req.session.username = username;
          req.session.userId = user.id;
          res.redirect('/');
        })
        .catch((error) => {
          req.flash('errorMessage', `使用者名稱 ${username} 已被註冊`);
          return next();
        });
    });
  },

  logout: (req, res) => {
    req.session.username = null;
    res.redirect('/');
  },
};

module.exports = userController;
