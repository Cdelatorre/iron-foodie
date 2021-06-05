const faker = require('faker');
const mongoose = require('mongoose');
const restaurants = require('../data/restaurants.json');
const Restaurant = require('../models/restaurant.model');

require('../config/db.config');

mongoose.connection.once('open', () => {
  console.info(`*** Connected to the database ${mongoose.connection.db.databaseName} ***`);

  mongoose.connection.db
    .dropDatabase()
    .then(() => console.log(`- Database dropped`))
    .then(() => {
      const data = restaurants.map((restaurant) => {
        return {
          ...restaurant,
          categories: ['vegan', 'healthy'],
          description: faker.lorem.sentence(),
          capacity: Math.floor(Math.random() * 100 + 10),
        };
      });

      return Restaurant.create(data);
    })
    .then(() => console.info(`- All data created!`))
    .catch((error) => console.error(error))
    .then(() => process.exit(0));
});
