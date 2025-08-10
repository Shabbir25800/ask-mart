const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  passwordHash: String,
  role: { type: String, enum: ['customer','employee','admin'], default: 'customer' },
  ordersCount: { type: Number, default: 0 },
  meta: { type: Object, default: {} }
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);
