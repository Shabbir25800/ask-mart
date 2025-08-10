const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
router.post('/employees', auth, async (req,res)=>{
  if(req.user.role !== 'admin') return res.status(403).send('forbidden');
  const { name, email, role } = req.body;
  if(await User.findOne({ email })) return res.status(400).send('email exists');
  const pwd = Math.random().toString(36).slice(-10);
  const hash = await bcrypt.hash(pwd, 12);
  const u = await User.create({ name, email, passwordHash: hash, role: 'employee', meta: {} });
  res.json({ ok:true, tempPassword: pwd });
});
module.exports = router;
