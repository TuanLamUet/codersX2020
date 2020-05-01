const uuid = require('shortid');

const bcrypt = require('bcryptjs');
const db = require("../db.js");


let saltRouds = 10;
let salt = bcrypt.genSaltSync(saltRouds);


let getAllUser = (req, res) => {
  return res.render("users/users.pug", {
    users: db.get("users").value(),
    user: db.get("users").find({userId: req.signedCookies.userId}).value()
  });
};
let createUser = (req, res) => {
  return res.render("users/create.pug" ,{
    user: db.get("users").find({userId: req.signedCookies.userId}).value()
  });
}
let createNewUser = (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = bcrypt.hashSync(req.body.password, salt);
  let errors = [];
  let oldUser = db.get('users').find({email}).value();
  if(oldUser) {
    errors.push('User này đã tồn tại')
    return res.render("users/users", {
      errors: errors,
      users: db.get("users").value(),
      user: db.get("users").find({userId: req.signedCookies.userId}).value()
    })
  }
  db.get("users").push({userId: uuid.generate(), name, email,password, isAdmin: false, wrongLoginCount: 0}).write();
    return res.redirect("/users")
};
let deleteAnUser =(req, res) => {
  let userId = req.params.userId;
  db.get("users").remove({userId}).write();
  return res.redirect("/users");
};

let updateNameUserPage = (req, res) => {
  let userId = req.params.userId;
  return res.render("users/change-name.pug",{
    userId,
    user: db.get("users").find({userId: req.signedCookies.userId}).value()
  })
};
let updateNameUser = (req, res) => {
  let userId = req.params.userId;
  let name = req.body.name;
  db.get("users").find({userId}).assign({name}).write();
  return res.redirect("/users");
};

module.exports = {
  getAllUser,
  createUser,
  createNewUser,
  deleteAnUser,
  updateNameUser,
  updateNameUserPage,
}