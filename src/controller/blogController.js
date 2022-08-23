const blogModel = require("../model/blogModel")

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}
const createBlog = async function (req, res) {
    try {


const data = req.body
const{title, body, createdBy, updatedBy} = data

if (!isValidRequestBody(data))
return res.status(400).send({ status: false, msg: "Please Enter some data" })

let savedData = await blogModel.create(data)
res.status(201).send({status:true, msg:"successfully created the blog", data:savedData})


    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.createBlog = createBlog