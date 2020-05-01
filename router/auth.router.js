const router = require('express').Router();

const authController = require('../controller/auth.controller.js');

router.get("/login", authController.login)
router.post("/login", authController.loginPost);


module.exports = router;