const express = require('express');
const restaurants = require('../controllers/restaurants.controller');

const router = express.Router();

router.get('/restaurants', restaurants.list);
router.get('/restaurants/new', restaurants.create);
router.post('/restaurants', restaurants.doCreate);

router.get('/', (req, res) => {
  res.redirect('/restaurants');
});

module.exports = router;
