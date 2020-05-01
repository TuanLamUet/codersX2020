const router = require('express').Router();

const userController = require('../controller/users.controller')
//router user 
router.get("/", userController.getAllUser)
router.get("/:userId/delete", userController.deleteAnUser);
router.get("/:userId/update", userController.updateNameUserPage);
router.get("/create", userController.createUser);

router.post("/create", userController.createNewUser);
router.post("/:userId/update", userController.updateNameUser);

module.exports = router;