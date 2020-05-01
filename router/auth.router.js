const router = require('express').Router();
<<<<<<< HEAD
const authController = require('../controller/auth.controller.js');

router.get("/login", authController.login)
router.post("/login", authController.loginPost);
=======
const authController = require('../controller/auth.controller');

router.get("/login", authController.login)

>>>>>>> e310ae909da06351d2dea74b466b42c96694a5d7

module.exports = router;