const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      default: [],
    },
    vegFriendly: {
      type: Boolean,
      default: false,
    },
    cost: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default:
        'https://www.guiadelnino.com/var/guiadelnino.com/storage/images/recetas-para-ninos-y-bebes/pasta/macarrones-con-tomate-y-chorizo/7625250-3-esl-ES/macarrones-con-tomate-y-chorizo_w1140.jpg',
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
  },
  { timestamps: true },
);

const Dish = mongoose.model('Dish', schema);

module.exports = Dish;
