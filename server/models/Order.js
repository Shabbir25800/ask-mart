const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{ productId: mongoose.Schema.Types.ObjectId, qty: Number, price: Number }],
  total: Number,
  paymentMethod: String,
  status: { type: String, default: 'pending' },
  razorpayOrderId: String
},{ timestamps: true });
module.exports = mongoose.model('Order', orderSchema);
