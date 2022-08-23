const blogModel = require("../model/blogModel")
const userModel = require("../model/userModel")

const mongoose = require('mongoose')



const isValid = function (value) {
    if (typeof value == undefined || value == null || value.length == 0) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true

}
const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}
const createBlog = async function (req,res){
    try {
       let data = req.body
      const {title,userId,body} = data
      console.log(data)
      let isValidUser = await userModel.findById(userId)
      console.log(isValidUser)
        if (!isValidUser) {
            return res.status(400).send({ status: false, msg: "you are not allow to create the data ! .. token is Wrong" })
        }

     let userId1 =await userModel.findById(userId).select({email:0,password:0,bphone:0,adress:0})
        //let data = JSON.parse(JSON.stringify(isValidUser)) 
    
        const create =await blogModel.create(data)
        return res.status(201).send({status:true, msg:"successfully created",data:create})
}
 catch (error) {
    return res.status(500).send({ status: "failed", msg: error.message })
}

}





const updateBLog= async function (req, res) {
    try {
        let blogid = req.params.blogId
        let check = await blogModel.findById(blogid)
        if (!check) return res.send('not valid id')

        
        let update = await blogModel.findOneAndUpdate({ _id: blogid }, { new: true })

        let updateBody = req.body
        let updated = await blogModel.findOneAndUpdate({ _id: blogid }, updateBody, { new: true })
        res.status(200).send({ msg: updated });

    } catch (err) {
        return res.status(500).send({ msg: err.mesage })
    }
}


const getBlogById = async function (req, res) {
    try {
        let blogId = req.params.blogId

        if (!isValid(blogId)) {
            return res.status(400).send({ status: false, message: "Please , provide blogId in path params" })

        }
        if (!isValidObjectId(blogId)) {
            return res.status(400).send({ status: false, msg: 'please provide a valid blogId' })
        }
        // console.log(eventId)
        const findBlogId = await blogModel.findById({ _id: blogId })
        //  console.log(findEvent)
        return res.status(200).send({ status: true, data: findBlogId })

    }

    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}



const getBlog = async function (req, res) {
    try {

        const blogId = req.params.blogId
        const queryParams = req.query
        const { title } = queryParams
        if (title) {
            let sortedBlog = await blogModel.find({ blogId: blogId }).sort({ "title": 1 })
            return res.status(200).send({ status: true, msg: "Sorted Book By Title", data: sortedBlog })
        }



    } catch (error) {
        return res.status(500).send({ status: "failed", msg: error.message })
    }

}

const deleteBlogById = async function (req, res) {
    try {
        let blogId = req.params.blogId

        if (!isValid(blogId)) {
            return res.status(400).send({ status: false, message: "Please , provide blogId in path params" })

        }
        if (!isValidObjectId(blogId)) {
            return res.status(400).send({ status: false, msg: 'please provide a valid blogId' })
        }
        // console.log(eventId)
        const findBlogId = await blogModel.deleteOne({ _id: blogId })
        //  console.log(findEvent)
        return res.status(200).send({ status: true, data: findBlogId })

    }

    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}




module.exports.createBlog = createBlog
module.exports.updateBLog=updateBLog
module.exports.getBlogById = getBlogById
module.exports.getBlog = getBlog
module.exports.deleteBlogById = deleteBlogById
