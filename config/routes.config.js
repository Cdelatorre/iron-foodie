const express = require('express');
const restaurants = require('../controllers/restaurants.controller');
const dishes = require('../controllers/dishes.controller');
const auth = require('../controllers/auth.controller');
const secure = require('../middlewares/secure.mid');
const upload = require('../config/multer.config');
const router = express.Router();

router.get('/restaurants', restaurants.list);
router.get('/restaurants/new', secure.isAuthenticated, restaurants.create);
router.get('/restaurants/:id', restaurants.detail);
router.post('/restaurants', secure.isAuthenticated, restaurants.doCreate);
router.get('/restaurants/:id/edit', secure.isAuthenticated, secure.restaurantOwner, restaurants.edit);
router.post('/restaurants/:id/edit', secure.isAuthenticated, secure.restaurantOwner, restaurants.doEdit);
router.post('/restaurants/:id/delete', secure.isAuthenticated, secure.restaurantOwner, restaurants.delete);

router.get('/dishes', dishes.list);

router.get('/register', secure.isNotAuthenticated, auth.register);
router.post('/register', secure.isNotAuthenticated, upload.array('avatar'), auth.doRegister);

router.get('/login', secure.isNotAuthenticated, auth.login);
router.post('/login', secure.isNotAuthenticated, auth.doLogin);
router.get('/logout', secure.isAuthenticated, auth.logout);
router.get('/users/:id/activate', auth.activate);

router.get('/authenticate/google', auth.loginWithGoogle);
router.get('/authenticate/google/cb', auth.doLoginWithGoogle);

router.get('/', (req, res) => {
  res.redirect('/restaurants');
});

module.exports = router;
