const jwt = require('jsonwebtoken')
const constant = require("../constant.js")
const blogModel = require("../model/blogModel")
const userModel = require("../model/userModel")
const authentication = async (req, res, next) => {
    try {
        let token = req.headers["x-api-key"];

        if (!token) {
            return res.status(constant.httpCodes.HTTP_FORBIDDEN).send({ status: false, message: constant.messages.AUTHENTICATE.TOKEN,data: null })

        }
        let decodedToken = jwt.verify(token, process.env.scretKey);
        let userId = decodedToken.userId
        if (!decodedToken) {
            return res.status(constant.httpCodes.HTTP_FORBIDDEN).send({ status: false, message: constant.messages.AUTHENTICATE.INVALID ,data: null});
        }
        if (req.body.userId) {
            if (decodedToken.userId != req.body.userId) {
                return res.status(constant.httpCodes.HTTP_FORBIDDEN).send({ status: false, message: constant.messages.AUTHENTICATE.INVALID ,data: null});
            }
        }
        if (!req.body.userId) {
            if (decodedToken.userId != req.params.userId) {
                return res.status(constant.httpCodes.HTTP_FORBIDDEN).send({ status: false, message: constant.messages.AUTHENTICATE.INVALID ,data: null});
            }
        }

        


        next()
    } catch (error) {
     //   console.error(`Error! ${error.message}`)
        res.status(constant.httpCodes.HTTP_SERVER_ERROR).send({ status: false, message: error.message })
    }
}


// const authorisation = async (req, res, next) => {
//     try {
//         let token = req.headers['x-api-key'];
//         let validToken = jwt.verify(token, process.env.scretKey)
//         if (!validToken) {
//             return res.status(constant.httpCodes.HTTP_FORBIDDEN).send({ status: false, message: constant.messages.AUTHENTICATE.INVALID })
//         }
//         let blogId = req.params.blogId

//         if (!blogId) {
//             return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.BLOG.PARAM })
//         }
//         const data = await blogModel.findById({ blogId })
//         if (!data) {
//             return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.BLOG.VALIDID })
//         }
//         let blogUserId = data.userId
//         let tokenUserId = validTOken.userId

//         //  let Id = await blogModel.findById(blogId)
//         //console.log(Id)

//         // let Blogtobemodified = Id.userId
//         // console.log(Blogtobemodified)

//         // let userloggedin = validToken.userId
//         // console.log(userloggedin)

//         if (tokenUserId  != blogUserId ) {
//             return res.status(constant.httpCodes.HTTP_FORBIDDEN).send({ status:false,message: constant.messages.AUTHENTICATE.FAILER})
//         }


//         // req.user = 
//         next();

//     } catch (err) {
//         res.status(constant.httpCodes.HTTP_SERVER_ERROR).send({ error: err.message })
//     }


// }





module.exports.authentication = authentication
//module.exports.authorisation = authorisation