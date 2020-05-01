<<<<<<< HEAD
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
=======
const db = require('../db.json');

const isAdmin = (req, res, next) => {
  let user = db.get('users').find({userId: req.userId}).value();
  if(!user) {
    res.redirect("/");
  } 
  next();
}

module.exports = isAdmin;
>>>>>>> e310ae909da06351d2dea74b466b42c96694a5d7
