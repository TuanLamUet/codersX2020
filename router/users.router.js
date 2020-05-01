const router = require('express').Router();

const userController = require('../controller/users.controller')
//router user 
router.get("/", userController.getAllUser)
router.get("/:userId/delete", userController.deleteAnUser);
router.get("/:userId/update", userController.updateNameUserPage);
<<<<<<< HEAD
router.get("/create", userController.createUser);

router.post("/create", userController.createNewUser);
router.post("/:userId/update", userController.updateNameUser);
=======


router.post("/create", userController.createNewUser);
router.post("/:userId/update", userController.updateNameUserPage);
>>>>>>> e310ae909da06351d2dea74b466b42c96694a5d7


module.exports = router;