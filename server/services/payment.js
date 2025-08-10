const Razorpay = require('razorpay');
const instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID || '', key_secret: process.env.RAZORPAY_KEY_SECRET || '' });
async function createOrder(amountRs, receiptId){
  if(!process.env.RAZORPAY_KEY_ID) return { id: 'rzp_test_placeholder' };
  const order = await instance.orders.create({ amount: Math.round(amountRs*100), currency:'INR', receipt: receiptId });
  return order;
}
module.exports = { createOrder };
