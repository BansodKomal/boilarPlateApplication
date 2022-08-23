const jwt = require('jsonwebtoken')
const userModel = require("../model/userModel")
const blogModel = require("../model/blogModel")
const authentication = async (req, res, next) => {
    try {
        const token = req.header('x-api-key')
        if (!token) {
            return   res.status(403).send({ status: false, message: `Missing authentication token in request` })
            
        }

        const decoded = await jwt.verify(token, "komal")

        if (!decoded) {
         return   res.status(403).send({ status: false, message: `Invalid authentication token in request` })
        
        }

        req.userId = decoded.userId;
        console.log(req.userId)

        next()
    } catch (error) {
        console.error(`Error! ${error.message}`)
        res.status(500).send({ status: false, message: error.message })
    }
}


const authorisation = async (req, res, next) => {
    try {
        let token = req.headers['x-api-key'];
        let validToken = jwt.verify(token, 'komal')
        if (!validToken) return res.status(401).send({ error: "You are not authenticated user" })

        let blogId = req.params.blogId

        //if( !bookId )   bookId = req.query.bookId

        if (!blogId) {
            return res.status(400).send({ error: " Please , enter blogId " })
        }
        const data = await blogModel.find({ _id: blogId })
        if (!data) {
            return res.status(400).send({ error: "Invalid bookId" })
        }


        let Id = await blogModel.findById(blogId)
        console.log(Id)

        let Booktobemodified = Id.userId
        console.log(Booktobemodified)

        let userloggedin = validToken.UserId
        console.log(userloggedin)
        
        if (Booktobemodified != userloggedin) {
            return res.status(403).send({ msg: "Authorisation failed" })
        }



        next();
  
    } catch (err) {
        res.status(500).send({ error: err.message })
    }


}





module.exports.authentication = authentication
module.exports.authorisation = authorisation