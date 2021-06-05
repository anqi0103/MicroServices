const model = require('../database/index.js');
const catData = require('./catData.js');

model.mongoose.connection.dropCollection('catmodels', (err, result) => {
  model.CatModel.insertMany(catData.catExampleData, (err, data) => {
    if (err) {
      console.log(err);
    }
  });
});
