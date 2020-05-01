const uuid = require('uuid/v4');

const db = require("../db.js");



let getAllUser = (req, res) => {
  return res.render("users/users.pug", {
    users: db.get("users").value()
  });
};
let createUser = (req, res) => {
  return res.render("users/create.pug");
}
let createNewUser = (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  db.get("users").push({userId: uuid(), name, email,password: '123123'}).write();
  let errors = [];
  let oldUser = db.get('users').find({email}).value();
  if(oldUser) {
    errors.push('User này đã tồn tại')
    return res.render("users/users", {
      errors: errors,
      users: db.get("users").value()
    })
  }
  db.get("users").push({userId: uuid(), name, email, password: '123123'}).write();
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
    userId
  })
};
let updateNameUser = (req, res) => {
  let userId = req.params.userId;
  let name = req.body.name;
  db.get("users").find({userId}).assign({name}).write();
  return res.redirect("/users");
};
let login = (req, res) => {
  res.render("users/login.pug")
}
module.exports = {
  getAllUser,
  createUser,
  createNewUser,
  deleteAnUser,
  updateNameUser,
  updateNameUserPage,
  login
}