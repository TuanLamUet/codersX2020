<<<<<<< HEAD
const db = require('../db.js');

const login = (req, res) => {
   res.render("auth/login.pug")
}

const loginPost = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log(req.body)

  let user = db.get("users").find({email}).value();
  console.log(user);
  
  if(!user || password !== user.password) {
    return res.render("auth/login.pug", {
      errors: ['Sai tài khoản'],
      values: req.body
    });
  }

  res.cookie('userId', user.userId)
  return res.redirect("/");
}

module.exports = {
  login,
  loginPost
=======
const db = require('../db.json');

const login = (req, res) => {
  let user
}

module.exports = {
  login
>>>>>>> e310ae909da06351d2dea74b466b42c96694a5d7
}