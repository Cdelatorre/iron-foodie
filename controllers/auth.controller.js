const mongoose = require('mongoose');
const User = require('../models/user.model');
const mailer = require('../config/mailer.config');
const passport = require('passport');

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
        // si son más de uno es req.files
        if (req.file) {
          user.avatar = req.file.path;
        }

        return User.create(user).then((user) => {
          mailer.sendValidationEmail(user);
          res.redirect('/');
        });
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

const loginWithStrategy = (strategy, req, res, next) => {
  const passportController = passport.authenticate(strategy, (error, user, validations) => {
    if (error) {
      next(error);
    } else if (!user) {
      res.status(400).render('auth/login', { user: strategy === 'local-auth' ? req.body : {}, errors: validations });
    } else {
      req.login(user, (error) => {
        if (error) next(error);
        else res.redirect('/');
      });
    }
  });

  passportController(req, res, next);
};

module.exports.doLogin = (req, res, next) => {
  loginWithStrategy('local-auth', req, res, next);
};

module.exports.loginWithGoogle = (req, res, next) => {
  const passportController = passport.authenticate('google-auth', {
    scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
  });

  passportController(req, res, next);
};

module.exports.doLoginWithGoogle = (req, res, next) => {
  loginWithStrategy('google-auth', req, res, next);
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/login');
};

module.exports.activate = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, { active: true })
    .then(() => {
      res.redirect('/login');
    })
    .catch(next);
};
