const mongoose = require('mongoose');
const createError = require('http-errors');
const Dish = require('../models/dish.model');

module.exports.list = (req, res, next) => {
  Dish.find()
    .sort({ createdAt: 'desc' })
    .limit(50)
    .populate('restaurant')
    .then((dishes) => {
      res.render('dishes/list', { dishes });
    })
    .catch((err) => {
      next(err);
    });
};
