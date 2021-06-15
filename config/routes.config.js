const express = require('express');
const restaurants = require('../controllers/restaurants.controller');
const dishes = require('../controllers/dishes.controller');
const auth = require('../controllers/auth.controller');
const secure = require('../middlewares/secure.mid');

const router = express.Router();

router.get('/restaurants', restaurants.list);
router.get('/restaurants/new', secure.isAuthenticated, restaurants.create);
router.get('/restaurants/:id', restaurants.detail);
router.post('/restaurants', secure.isAuthenticated, restaurants.doCreate);

router.get('/dishes', dishes.list);

router.get('/register', auth.register);
router.post('/register', auth.doRegister);

router.get('/login', auth.login);
router.post('/login', auth.doLogin);
router.get('/logout', auth.logout);


router.get('/', (req, res) => {
  res.redirect('/restaurants');
});

module.exports = router;
