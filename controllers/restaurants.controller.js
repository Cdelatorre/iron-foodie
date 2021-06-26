const mongoose = require('mongoose');
const createError = require('http-errors');
const Restaurant = require('../models/restaurant.model');
const categories = Object.keys(require('../data/categories.json'));

module.exports.list = (req, res, next) => {
  Restaurant.find()
    .populate('owner')
    .sort({ createdAt: 'desc' })
    .limit(9)
    .then((restaurants) => res.render('restaurants/list', { restaurants }))
    .catch((error) => next(error));
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
    .catch(error => next(error));
};

module.exports.create = (req, res, next) => {
  res.render('restaurants/new', {
    categories: categories
  });
};

module.exports.doCreate = (req, res, next) => {
  
  let restaurantCategories = req.body.categories;
  if (restaurantCategories && !Array.isArray(restaurantCategories)) {
    restaurantCategories = [restaurantCategories]
  }

  const restaurant = new Restaurant({
    name: req.body.name,
    address: req.body.address,
    image: req.body.image,
    description: req.body.description,
    categories: restaurantCategories,
    capacity: req.body.capacity,
    maxProductCost: req.body.maxProductCost,
    owner: req.user.id,
  });

  restaurant
    .save()
    .then(() => res.redirect('/restaurants'))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).render('restaurants/new', {
          errors: error.errors,
          restaurant,
          categories,
        });
      } else {
        next(error);
      }
    });
};

module.exports.edit = (req, res, next) => {
  res.render('./restaurants/edit', { 
    restaurant: req.restaurant,
    categories: categories 
  });
};

module.exports.doEdit = (req, res, next) => {
  Restaurant.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    address: req.body.address,
    image: req.body.image,
    description: req.body.description,
    categories: req.body.categories,
    capacity: req.body.capacity,
    maxProductCost: req.body.maxProductCost,
  }, { runValidators: true, new: true })
    .then((restaurant) => res.redirect(`/restaurants/${restaurant.id}`))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).render('restaurants/edit', {
          errors: error.errors,
          restaurant: req.body,
          categories,
        });
      } else {
        next(error);
      }
    });
};

module.exports.delete = (req, res, next) => {
  Restaurant.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/restaurants'))
    .catch(error => next(error));
};
