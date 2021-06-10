const mongoose = require('mongoose');
const User = require('../models/user.model');


module.exports.register = (req, res, next) => {
  res.render('auth/register');
}

module.exports.doRegister = (req, res, next) => {
  const user = { name , email, password } = req.body; /// { name: 'Carlos', email: 'carlos@example.org' }
  User.create(user)
    .then(user => res.redirect('/restaurants'))
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('auth/register', {
          user: user,
          errors: error.errors
        });
      } else {
        next(error);
      }
    })
}
