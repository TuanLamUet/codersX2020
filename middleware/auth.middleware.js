const db = require('../db');

const requireAuth = (req, res, next) => {
  if(!req.signedCookies.userId) {
    return res.redirect('/auth/login');
  }

  const user = db.get("users").find({userId: req.signedCookies.userId}).value();
  
  if(!user) {
    return res.redirect('/auth/login');
  }
  
  next();

}

module.exports = {
  requireAuth
}