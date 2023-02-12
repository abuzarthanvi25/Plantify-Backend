const mongoose = require("mongoose");

const SeedSchema = mongoose.Schema({
  name: String,
  price: Number,
  image:String,
  overview: Object,
  seed_bio: String,
  category: String
});

const SeedModel = mongoose.model("Seed", SeedSchema);

module.exports = SeedModel;
