const mongoose = require("mongoose")
const Exp = require('../models/Exp')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "username is required" ],
        unique: [true, "username already taken please pick another username"]
    },
    password:{
        type:String,
        required:[true, "password is required"]
    },
    first:{
        type:String,
        required:[true, 'don\'t forget to write your first name']
    },

    last:{
        type:String,
        required:[true, 'don\'t forget to write your last name']
    },
})

const User = mongoose.model("User",userSchema)

module.exports = User