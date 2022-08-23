const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const UserSchema = new mongoose.Schema({

title:{
    type:String
},
body:{
    type:String
},
userId:{
    type:ObjectId,
    required:true,
     ref:"User"

}
 },  { timestamps: true }
)

module.exports = mongoose.model("Blog", UserSchema)