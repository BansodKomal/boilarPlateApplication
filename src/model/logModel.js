const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const logSchema = new mongoose.Schema({
date:{
    type:Date,
    default:Date.now
}, 
api:{
type:String,

},
userId:{
    type:ObjectId,
   // required:true,
     ref:"User"

}

}, { timestamps: true }
)

module.exports = mongoose.model("Log", logSchema)