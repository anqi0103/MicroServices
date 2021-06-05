const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECT);

const catSchema = new mongoose.Schema({
  imageURL: String,
  breed: String,
  name: String,
  age: String,
  location: String,
  status: String,
  information: String,
});

const CatModel = mongoose.model('CatModel', catSchema);

module.exports.CatModel = CatModel;
module.exports.mongoose = mongoose;
