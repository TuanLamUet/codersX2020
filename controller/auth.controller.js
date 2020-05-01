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
}