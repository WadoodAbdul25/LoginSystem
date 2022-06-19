const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default: Date.now()
    }
})
const usermodel = mongoose.model('Userlogin',userSchema);
module.exports = usermodel;