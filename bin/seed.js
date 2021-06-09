const faker = require('faker');
const mongoose = require('mongoose');
const restaurants = require('../data/restaurants.json');
const Restaurant = require('../models/restaurant.model');
const Dish = require('../models/dish.model');

require('../config/db.config');

mongoose.connection.once('open', () => {
  console.info(`*** Connected to the database ${mongoose.connection.db.databaseName} ***`);

  mongoose.connection.db
    .dropDatabase()
    .then(() => console.log(`- Database dropped`))
    .then(() => {
      restaurants.forEach((restaurant) => {
        new Restaurant({
          ...restaurant,
          categories: ['vegan', 'healthy'],
          description: faker.lorem.sentence(),
          capacity: Math.floor(Math.random() * 100 + 10),
        })
          .save()
          .then((restaurant) => {
            for (let i = 0; i < 10; i++) {
              const dish = new Dish({
                name: faker.address.city(),
                ingredients: [],
                vegFriendly: Math.random() > 0.5,
                cost: Math.random() * 20,
                image: faker.image.food(),
                restaurant: restaurant._id,
              });

              dish
                .save()
                .then((dish) => {
                  console.log(`dish ${dish.name} for ${restaurant.name}`);
                })
                .catch(console.error);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      });
    })
    .catch((error) => console.error(error));
});
