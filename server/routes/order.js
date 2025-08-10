const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');
const Order = require('../models/Order');
const payment = require('../services/payment');
router.post('/checkout', auth, async (req,res)=>{
  const { cart, paymentMethod } = req.body;
  const user = await User.findById(req.user.id);
  if(paymentMethod === 'COD' && user.ordersCount === 0){
    return res.status(400).send({ error: 'COD not allowed for first order' });
  }
  const total = cart.reduce((s,i)=> s + (i.price*i.qty), 0);
  let order = await Order.create({ user: user._id, items: cart, total, paymentMethod, status: 'created' });
  if(paymentMethod === 'ONLINE'){
    const rz = await payment.createOrder(total, String(order._id));
    order.razorpayOrderId = rz.id;
    await order.save();
    return res.json({ order, razorpay: rz });
  }
  res.json({ order });
});
module.exports = router;
