const router = require('express').Router();
const authController = require('../controller/auth.controller');

router.get("/login", authController.login)


module.exports = router;