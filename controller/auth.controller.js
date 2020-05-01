
const db = require('../db.js');
const bcrypt = require('bcryptjs');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


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
  if(user.wrongLoginCount > 2) {
    const msg = {
      to: user.email,
      from: 'tuanlv.amc@gmail.com',
      subject: 'Bạn có thể truy cập vào ứng dụng',
      text: 'Bạn đã nhập sai quá số lần quy định, để tiếp tục truy cập ứng dụng, vui lòng ấn vào',
      html: `<p>Bạn đã nhập sai quá số lần quy định, để tiếp tục truy cập ứng dụng, vui lòng ấn vào <a href="localhost:3000/auth/verify/:${user.userId}">đây</a></p>`,
    };
    sgMail.send(msg).then(() => console.log('đã gửi email')).catch(err => console.error(err));
    return res.render("auth/login.pug", {
      errors: ['Bạn đã nhập sai tài khoản quá số lần quy định'],
      values: req.body
    });
  }
  if(!bcrypt.compareSync(password, user.password)) {
    db.get("users").find({userId: user.userId}).assign({wrongLoginCount: user.wrongLoginCount + 1}).write();   
    return res.render("auth/login.pug", {
      errors: ['Sai tài khoản hoặc mật khẩu'],
      values: req.body
    });
  }
  user.wrongLoginCount = 0;
  res.cookie('userId', user.userId, {
    signed: true
  })
  return res.redirect("/");
}


module.exports = {
  login,
  loginPost
}