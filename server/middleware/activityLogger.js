const Audit = require('../models/AuditLog');
module.exports = function(req,res,next){
  res.on('finish', async ()=>{
    try{
      if(req.user && req.user.role === 'employee'){
        await Audit.create({
          user: req.user.id,
          action: `${req.method} ${req.originalUrl}`,
          status: res.statusCode,
          ip: req.ip,
          ua: req.get('User-Agent'),
          body: req.body
        });
      }
    }catch(e){ console.error('audit save err', e); }
  });
  next();
};
