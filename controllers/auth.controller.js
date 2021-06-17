const mongoose = require('mongoose');
const User = require('../models/user.model');

module.exports.register = (req, res, next) => {
  res.render('auth/register');
};

module.exports.doRegister = (req, res, next) => {
  function renderWithErrors(errors) {
    res.render('auth/register', {
      user: req.body,
      errors: errors,
    });
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        renderWithErrors({ email: 'email already registered' });
      } else {
        user = { name, email, password } = req.body; // { name: 'Carlos', email: 'carlos@example.org', password: '12345678' }

        if (req.file) {
          user.avatar = req.file.path;
        }

        return User.create(user).then((user) => res.redirect('/'));
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        renderWithErrors(error.errors);
      } else {
        next(error);
      }
    });
};

module.exports.login = (req, res, next) => {
  res.render('auth/login');
};

module.exports.doLogin = (req, res, next) => {
  function renderWithLoginError() {
    res.render('auth/login', {
      user: req.body,
      errors: {
        email: 'Invalid email or password',
      },
    });
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        renderWithLoginError();
      } else {
        return user.checkPassword(req.body.password).then((match) => {
          if (!match) {
            renderWithLoginError();
          } else {
            req.session.userId = user.id;
            res.redirect('/');
          }
        });
      }
    })
    .catch((error) => next(error));
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/login');
};
