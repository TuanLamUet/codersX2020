const router = require('express').Router();
var multer  = require('multer');

var upload = multer({ dest: 'public/uploads/' });

const userController = require('../controller/users.controller')
//router user 
router.get("/", userController.getAllUser)
router.get("/:userId/delete", userController.deleteAnUser);
router.get("/:userId/update", userController.updateNameUserPage);
router.get("/create", userController.createUser);

router.post("/create",upload.single('avatar'), userController.createNewUser);
router.post("/:userId/update", userController.updateNameUser);


router.post("/create", userController.createNewUser);
router.post("/:userId/update", userController.updateNameUserPage);


module.exports = router;