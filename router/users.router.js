const router = require('express').Router();

const userController = require('../controller/users.controller')
//router user 
router.get("/", userController.getAllUser)
router.get("/:userId/delete", userController.deleteAnUser);
router.get("/:userId/update", userController.updateNameUserPage);


router.post("/create", userController.createNewUser);
router.post("/:userId/update", userController.updateNameUserPage);


module.exports = router;