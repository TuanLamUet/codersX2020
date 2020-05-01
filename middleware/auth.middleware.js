const db = require('../db');

const requireAuth = (req, res, next) => {
  if(!req.cookies.userId) {
    return res.redirect('/auth/login');
  }

  const user = db.get("users").find({userId: req.cookies.userId}).value();
  
  if(!user) {
    return res.redirect('/auth/login');
  }
  
  next();

}

module.exports = {
  requireAuth
}