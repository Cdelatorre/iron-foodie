const mongoose = require('mongoose');
const createError = require('http-errors');
const Restaurant = require('../models/restaurant.model');

module.exports.list = (req, res, next) => {
  Restaurant.find()
    .sort({ createdAt: 'desc' })
    .limit(10)
    .then((restaurants) => {
      res.render('restaurants/list', { restaurants });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.detail = (req, res, next) => {
  Restaurant.findById(req.params.id)
    .populate('dishes')
    .then((restaurant) => {
      if (restaurant) {
        res.render('restaurants/detail', { restaurant });
      } else {
        res.redirect('/restaurants');
      }
    })
    .catch(next);
};

module.exports.create = (req, res, next) => {
  res.render('restaurants/new');
};

module.exports.doCreate = (req, res, next) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    address: req.body.address,
    image: req.body.image,
    description: req.body.description,
    categories: req.body.categories,
    capacity: req.body.capacity,
    maxProductCost: req.body.maxProductCost,
    owner: req.user.id
  });

  restaurant
    .save()
    .then(() => {
      res.redirect('/restaurants');
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('restaurants/new', {
          errors: error.errors,
          restaurant,
        });
      } else {
        next(error);
      }
    });
};

module.exports.edit = (req, res, next) => {};

module.exports.doEdit = (req, res, next) => {};

module.exports.delete = (req, res, next) => {};
