const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  history: [{ when:Date, by: String, change: Object }]
},{ timestamps: true });
module.exports = mongoose.model('Product', productSchema);
