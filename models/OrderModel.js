const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  user_name: String,
  user_id: String,
  cart_items: Object,
  created_at: String,
  sub_total: String,
  delivery_status: Boolean
});

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
