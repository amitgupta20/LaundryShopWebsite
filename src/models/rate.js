const mongoose = require("mongoose");
const rateSchema = new mongoose.Schema({    
    id:{
        type:Number,
        required:true,
        default:1
    },
    simpleWash:{
        type:Number,
        required:true
    },
    woolenWash:{
        type:Number,
        required:true
    },
    blanketWash:{
        type:Number,
        required:true
    },
    plainIron:{
        type:Number,
        required:true
    },
    delicateIron:{
        type:Number,
        required:true
    },
    sandIron:{
        type:Number,
        required:true
    },
    normalDry:{
        type:Number,
        required:true
    },
    sodaDry:{
        type:Number,
        required:true
    },
    woolenDry:{
        type:Number,
        required:true
    }     
})
const Rate = new mongoose.model("Rate",rateSchema);
module.exports = Rate;