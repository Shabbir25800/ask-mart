const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/google/fail' }), (req, res)=>{
  const payload = { id: req.user._id, role: req.user.role, email: req.user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
  res.json({ token });
});
router.get('/google/fail', (req,res)=> res.status(401).send('Google auth failed'));
module.exports = router;
