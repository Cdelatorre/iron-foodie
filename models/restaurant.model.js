const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categories = require('../data/categories.json');

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    address: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: 'https://media-cdn.tripadvisor.com/media/photo-s/17/75/3f/d1/restaurant-in-valkenswaard.jpg',
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
    },
    categories: {
      type: [{
        type: String,
        enum: Object.keys(categories)
      }],
      default: [],
    },
    capacity: {
      type: Number,
      required: true,
    },
    maxProductCost: {
      type: Number,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

schema.virtual('dishes', {
  ref: 'Dish',
  localField: '_id',
  foreignField: 'restaurant',
  justOne: false,
});

const Restaurant = mongoose.model('Restaurant', schema);

module.exports = Restaurant;
