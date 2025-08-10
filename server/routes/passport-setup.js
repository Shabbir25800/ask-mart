const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
module.exports = function(passport){
  passport.serializeUser((user, done)=> done(null, user.id));
  passport.deserializeUser(async (id, done)=>{
    const u = await User.findById(id);
    done(null, u);
  });
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  }, async (accessToken, refreshToken, profile, cb)=>{
    const allowed = process.env.ADMIN_EMAIL?.toLowerCase();
    const email = profile.emails?.[0]?.value?.toLowerCase();
    if(email !== allowed) return cb(null, false, { message: 'Not authorized' });
    let user = await User.findOne({ email });
    if(!user){
      user = await User.create({ name: profile.displayName, email, role: 'admin', oauthProvider: 'google' });
    }
    return cb(null, user);
  }));
};
