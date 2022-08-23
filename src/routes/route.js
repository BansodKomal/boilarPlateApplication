const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const logController = require('../controller/logController')

const blogController = require('../controller/blogController')

router.post("/signUpUser",userController.signUpUser);
router.post("/logUser",logController.logData );
router.post("/createBlog", blogController.createBlog)
router.post("/loginUSer", userController.loginUser)
module.exports = router;