const logModel = require("../model/logModel")
const constant = require("../constant.js")
const userModel = require("../model/userModel")
const mongoose = require('mongoose');
const blogModel = require("../model/blogModel");
const ObjectId = mongoose.Schema.Types.ObjectId


const logData = async function (req, res, next) {
    try {
 let data = req.body
  
     let data1= {
        date : new Date(),
        api:req.originalUrl,
         userId:req.params.userId

      
     }
   //  console.log(req._id)
        let create=await logModel.create(data1)
  
next()

        }

            catch (err) {
                res.status(constant.httpCodes.HTTP_SERVER_ERROR).send({ status: false, message: err.message })
            }
        }
        
        
        module.exports.logData =logData 