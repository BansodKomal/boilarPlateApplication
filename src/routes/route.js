const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const logController = require('../controller/logController')

const blogController = require('../controller/blogController')
const middleware = require("../middleware/auth.js")

router.post("/signUpUser",userController.signUpUser);
router.post("/loginUSer", userController.loginUser)

router.post("/logUser",logController.logData );

router.post("/createBlog", middleware.authentication ,blogController.createBlog)
router.put("/updateBlog/:blogId", middleware.authentication , middleware.authorisation,blogController.updateBLog)
router.get("/getBlogById/:blogId", middleware.authentication ,blogController.getBlogById)
router.delete("/deleteById/:blogId" , middleware.authentication ,middleware.authorisation,blogController.deleteBlogById)
router.get("/getBlog/:blogId", middleware.authentication ,blogController.getBlog)


module.exports = router;