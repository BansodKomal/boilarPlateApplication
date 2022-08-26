const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')

const middleware2 = require('../middleware/logMiddleware')
const blogController = require('../controller/blogController')
const middleware = require("../middleware/auth.js")

router.post("/signUpUser",userController.signUpUser);
router.post("/loginUser", userController.loginUser)

router.post("/logUser",middleware2.logData );
router.delete("/deleteById/:userId/:blogId",middleware.authentication ,blogController.deleteBlogById)

router.post("/createBlog/:userId",  middleware.authentication , middleware2.logData, blogController.createBlog)
router.put("/updateBlog/:userId", middleware.authentication,middleware2.logData,blogController.updateBLog)
router.get("/getBlog/:userId" ,middleware.authentication,middleware2.logData,blogController.getBlog)



module.exports = router;