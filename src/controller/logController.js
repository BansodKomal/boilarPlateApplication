const UserModel = require("../model/userModel")
const logModel = require("../model/logModel")

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const logData = async function (req, res) {
    try {
let data = req.body
const {date, userId} = data
let today = Date.now()
let id = await UserModel.findById(userId)
console.log(id)
let savedData = await logModel.create(data)
res.status(201).send({ status: true, msg: "successfully created", data: savedData })
    }catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}


module.exports.logData =logData 