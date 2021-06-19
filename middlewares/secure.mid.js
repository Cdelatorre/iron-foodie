const Restaurant = require('../models/restaurant.model');
const createError = require('http-errors');

module.exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

module.exports.isNotAuthenticated = (req, res, next) => {
  if (req.user) {
    res.redirect('/');
  } else {
    next();
  }
};

module.exports.restaurantOwner = (req, res, next) => {
  Restaurant.findById(req.params.id)
    .then((restaurant) => {
      if (restaurant) {
        if (restaurant.owner == req.user.id) {
          req.restaurant = restaurant;
          next();
        } else {
          next(createError(403));
        }
      } else {
        next(createError(404));
      }
    })
    .catch(next);
};
