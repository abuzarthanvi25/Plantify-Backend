const mongoose = require("mongoose");

const PlantCareSchema = mongoose.Schema({
  name: String,
  price: Number,
  image:String,
  description: String,
  dimensions: String,
  weight: String,
  made_in: String,
  category: String
});

const PlantCareModel  = mongoose.model("PlantCare", PlantCareSchema);

module.exports = PlantCareModel ;
