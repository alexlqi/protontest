
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order_id: String,
  customer_id: String,
  customer_name: String,
  product_id: String,
  product_name: String,
  quantity: Number,
  total_price: Number,
  date: Date
});

module.exports = mongoose.model('Order', orderSchema);
