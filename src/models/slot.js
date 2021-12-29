const mongoose = require("mongoose");
const slotSchema = new mongoose.Schema({    
    id:{
        type:Number,
        required:true,
        default:1
    },
    washTime:{
        type:String,
        required:true
    },
    ironTime:{
        type:String,
        required:true
    },
    dryTime:{
        type:String,
        required:true
    },
    openingTime:{
        type:String,
        required:true
    },
    closingTime:{
        type:String,
        required:true
    }    
})
const Slot = new mongoose.model("Slot",slotSchema);
module.exports = Slot;