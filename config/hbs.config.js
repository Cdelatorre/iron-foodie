const hbs = require('hbs');
const path = require('path');
const categories = require('../data/categories.json');

hbs.registerPartials(path.join(__dirname, '../views/partials'));

hbs.registerHelper('json', (data) => {
  return JSON.stringify(data);
});

hbs.registerHelper('prettyCost', (cost) => {
  return cost.toFixed(2) + '€';
});

hbs.registerHelper('active', (options) => {
  const { match, path } = options.hash;
  return path === match ? 'active' : '';
})

hbs.registerHelper('restaurantIsOwnerBy', function (options) {
  const { user, restaurant } = options.hash;
  if (user && (user.id == restaurant.owner?.id || user.id == restaurant.owner)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper('restaurantHasCategory', function (options) {
  const { restaurant, category } = options.hash;
  if (restaurant?.categories.includes(category)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
})

hbs.registerHelper('categoryLabel', function(options) {
  const { id, selector } = options.hash;
  return categories[id][selector];
});
