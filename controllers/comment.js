// const commentModel = require('../models/comment');
const db = require('../models');
const Comment = db.Comment;
const User = db.User;
const moment = require('moment');

const commentController = {
  index: (req, res) => {
    Comment.findAll({ include: User }).then((comments) => {
      res.render('index', {
        comments,
        moment,
      });
    });
  },

  add: (req, res) => {
    const { userId } = req.session; // 因為已經登入有 username
    const { content } = req.body;

    if (!userId || !content) {
      return res.redirect('/');
    }

    Comment.create({
      content,
      UserId: userId,
    }).then(() => {
      res.redirect('/');
    });
  },

  delete: (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.userId,
      },
    })
      .then((comment) => {
        return comment.destroy();
      })
      .then(() => {
        res.redirect('/');
      })
      .catch(() => {
        res.redirect('/');
      });
  },

  update: (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id,
      },
    }).then((comment) => {
      res.render('update', {
        comment,
      });
    });
  },

  handleUpdate: (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.userId,
      },
    })
      .then((comment) => {
        return comment.update({
          content: req.body.content,
        });
      })
      .then(() => {
        res.redirect('/');
      })
      .catch(() => {
        res.redirect('/');
      });
  },
};

module.exports = commentController;
