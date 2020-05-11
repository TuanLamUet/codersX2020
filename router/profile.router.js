const router = require('express').Router();
var multer  = require('multer');

var upload = multer({ dest: 'public/uploads/' });

const profileController = require('../controller/profile.controller')

router.get("/", profileController.profile)

router.post("/avatar",upload.single('avatar'), profileController.updateProfile);
module.exports = router;