const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,

    },

    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true


    },
    address: {
        type: String
    },
    updatedBy: {
        type: String
    },
    createdBy: {
        type: String
    }
}, { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema)