const mongoose = require("mongoose");

const AuthSchema = mongoose.Schema({
  email: String,
  password: String,
  user_name: String
});

const AuthModel = mongoose.model("Users", AuthSchema);

module.exports = AuthModel;
