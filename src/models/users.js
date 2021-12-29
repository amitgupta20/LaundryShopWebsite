const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    accountType: {
        type:String,
        required:true      
    },
    fullName: {
        type:String,
        required:true
            
    },
    contactNum: {
        type:String,
        required:true,
        minlength:10,
        unique:true  
    },
    address: {
        type:String,    
    },
    aadhar: {
        type:String,
        minlength:12
    },
    email: {
        type:String     
    },
    password: {
        type:String,
        required:true      
    },
    accountStatus: {
        type: Boolean,
        required:true
    }

})

const User = new mongoose.model("User",userSchema);
module.exports = User;