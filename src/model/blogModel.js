const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

title:{
    type:String
},
body:{
    type:String
},
updatedBy:{
    type:String
},
createdBy:{
    type:String
}
 },  { timestamps: true }
)

module.exports = mongoose.model("Blog", UserSchema)