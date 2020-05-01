
const db = require('../db.js');

const login = (req, res) => {
   res.render("auth/login.pug")
}

const loginPost = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let user = db.get("users").find({email}).value();
  
  if(!user || password !== user.password) {
    return res.render("auth/login.pug", {
      errors: ['Sai tài khoản hoặc mật khẩu'],
      values: req.body
    });
  }

  res.cookie('userId', user.userId)
  return res.redirect("/");
}

module.exports = {
  login,
  loginPost
}