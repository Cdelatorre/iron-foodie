const hbs = require('hbs');
const path = require('path');

hbs.registerPartials(path.join(__dirname, '../views/partials'));

hbs.registerHelper('json', (data) => {
  return JSON.stringify(data);
});

hbs.registerHelper('prettyCost', (cost) => {
  return cost.toFixed(2) + '€';
});

