const express = require('express');
const restaurants = require('../controllers/restaurants.controller');
const dishes = require('../controllers/dishes.controller');

const router = express.Router();

router.get('/restaurants', restaurants.list);
router.get('/restaurants/new', restaurants.create);
router.get('/restaurants/:id', restaurants.detail);
router.post('/restaurants', restaurants.doCreate);

router.get('/dishes', dishes.list);

router.get('/', (req, res) => {
  res.redirect('/restaurants');
});

module.exports = router;
