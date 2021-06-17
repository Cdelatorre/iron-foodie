const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const User = require('../models/user.model');

const sessionMaxAge = Number(process.env.SESSION_MAX_AGE || 7);

module.exports.sessionConfig = expressSession({
  secret: process.env.SESSION_SECRET || 'super secret (change it)',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.SESSION_SECURE || false,
    maxAge: 24 * 3600 * 1000 * sessionMaxAge,
  },
  store: MongoStore.create({
    mongoUrl: mongoose.connection._connectionString,
    ttl: 24 * 3600 * sessionMaxAge,
  }),
});

module.exports.loadUser = (req, res, next) => {
  const userId = req.session.userId;
  if (!userId) {
    next();
  } else {
    User.findById(userId)
      .then((user) => {
        req.user = user;
        res.locals.currentUser = user;
        next();
      })
      .catch((error) => next(error));
  }
};
