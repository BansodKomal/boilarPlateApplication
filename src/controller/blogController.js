const blogModel = require("../model/blogModel")
const userModel = require("../model/userModel")
const constant = require("../constant.js")
const log = require("../middleware/logMiddleware")

const mongoose = require('mongoose')

const objectId = (value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
        return helpers.message('"{{#label}}" must be a valid mongo id');
    }
    return value;
};

const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false

    return true

}
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}
const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}
const createBlog = async function (req, res) {
    try {
       let userId1 = req.params.userId
      //  console.log(userId)
      console.log(req)
        let data = req.body
        const { title, body,  userId } = data

        if (!isValid(userId)) {
            return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.USER.VALID, data: null })
        }



        if (!isValidObjectId(userId)) {
            return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.BLOG.VALIDID, data: null })
        }
   const isValidUser = await userModel.findById(userId)
        if (!isValidUser) {
            return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.BLOG.ABCENTID, data: null })
        }

           
            const create = await blogModel.create(data)

            return res.status(constant.httpCodes.NEWLYCREATED).send({ status: true, message: constant.messages.BLOG.SUCCESS, data: create })
     }
    

    catch (error) {
        return res.status(constant.httpCodes.HTTP_SERVER_ERROR).send({ status: false, message: error.message })
    }

}





const updateBLog = async function (req, res) {
   try {

        let blogId = req.query.blogId
        let userId = req.params.userId

        let body1 = req.body
        const{title, body} = body1

        if (!isValidObjectId(blogId)) {
            return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.BLOG.PARAM, data: null })
        }
        let check = await blogModel.findById(blogId)

        if (!check) {
            return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.BLOG.ABCENTID, data: null })
        }



        let updated = await blogModel.findOneAndUpdate({ _id: blogId }, body1, { new: true })
        res.status(constant.httpCodes.HTTP_SUCCESS).send({ status: true, message: constant.messages.BLOG.UPDATE, data: updated });

    } 
    catch (err) {
        return res.status(constant.httpCodes.HTTP_SERVER_ERROR).send({ message: err.mesage })
    }
}







const getBlog = async function (req, res) {
    try {

        const queryParams = req.query
        const { title, blogId } = queryParams
        let userId = req.params.userId
       

        const blog = await blogModel.find()
        //console.log(blog)
        if (blogId || title) {
            let id = await blogModel.findById(blogId)
            let title1 = await blogModel.find({ title: title })
            let data = (id || title1)
            return res.status(constant.httpCodes.HTTP_SUCCESS).send({ status: true, message: constant.messages.BLOG.GETID, data: data })
        }
        else {
            return res.status(constant.httpCodes.HTTP_SUCCESS).send({ status: true, message: constant.messages.BLOG.ALLBLOG, data: blog })
        }

    } catch (error) {
        return res.status(constant.httpCodes.HTTP_SERVER_ERROR).send({ status: false, msg: error.message })
    }

}

const deleteBlogById = async function (req, res) {
    try {
      

    let blogId = req.params.blogId
    console.log(blogId)
    let userId = req.params.userId

    if (!isValidObjectId(blogId)) {
        return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.BLOG.PARAM, data: null })
    }
    let ifExit = await blogModel.findById(blogId)

    if (!ifExit) {
        return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.BLOG.ABCENTID, data: null })
    }
   const findBlogId = await blogModel.deleteOne(ifExit)
   if(findBlogId){
    return res.status(constant.httpCodes.HTTP_SUCCESS).send({ status: true, message: constant.messages.BLOG.DELETE, data: findBlogId })

        }
        

  
        
}

    catch (err) {
        res.status(constant.httpCodes.HTTP_SERVER_ERROR).send({ status: false, message: err.message })
    }

}


module.exports = { createBlog, updateBLog, getBlog, deleteBlogById }
