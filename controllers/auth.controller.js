const mongoose = require('mongoose');
const User = require('../models/user.model');


module.exports.register = (req, res, next) => {
  res.render('auth/register');
}


module.exports.doRegister = (req, res, next) => {

  function renderWithErrors(errors) {
    res.render('auth/register', {
      user: req.body,
      errors: errors
    });
  }


  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        renderWithErrors({ email: 'email already registered' })
      } else {
        user = { name, email, password } = req.body; // { name: 'Carlos', email: 'carlos@example.org', password: '12345678' }
        return User.create(user)
          .then(user => res.redirect('/'))
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        renderWithErrors(error.errors);
      } else {
        next(error);
      }
    })
}
