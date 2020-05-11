const db = require('../db')
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'codersx-lt',
  api_key: '135564539149199',
  api_secret: 'WJ5d456U8GRsbSEtPkVYtiXqGMI'
})

const profile = (req, res) => {
  res.render("profile/profile", {
    user: db.get("users").find({userId: req.signedCookies.userId}).value()
  });
}

const updateProfile = (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  avatar = req.file.path.split('/').splice(1).join('/');
  
  db.get("users").find({userId: req.signedCookies.userId}).assign({name, email, avatar}).write()
  res.redirect('/profile')
}

module.exports = {
  profile,
  updateProfile
}