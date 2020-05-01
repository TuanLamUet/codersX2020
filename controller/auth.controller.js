
const db = require('../db.js');
const bcrypt = require('bcryptjs');

const login = (req, res) => {
   res.render("auth/login.pug")
}

const loginPost = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let user = db.get("users").find({email}).value();
  
  if(!user) {
    return res.render("auth/login.pug", {
      errors: ['Sai tài khoản hoặc mật khẩu'],
      values: req.body
    });
  }
  if(user.wrongLoginCount > 3) {
    return res.render("auth/login.pug", {
      errors: ['Bạn đã nhập sai tài khoản quá số lần quy định'],
      values: req.body
    });
  }
  if(!bcrypt.compareSync(password, user.password)) {
    user.wrongLoginCount++;
    return res.render("auth/login.pug", {
      errors: ['Sai tài khoản hoặc mật khẩu'],
      values: req.body
    });
  }
  user.wrongLoginCount = 0;
  res.cookie('userId', user.userId)
  return res.redirect("/");
}

module.exports = {
  login,
  loginPost
}