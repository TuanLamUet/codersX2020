const db = require('../db.json');

const isAdmin = (req, res, next) => {
  let user = db.get('users').find({userId: req.userId}).value();
  if(!user) {
    res.redirect("/");
  } 
  next();
}

module.exports = isAdmin;