const mongoose = require("mongoose");
const invoiceSchema = new mongoose.Schema({
    
    billNum: {
        type:Number,
        required:true,
        unique:true
    },
    contactNum: {
        type:String,
        required:true,
        minlength:10   
    },
    date: {
        type:String,
        required:true
    },
    wsQty:{
        type:Number,
        required:true
    },
    wbQty:{
        type:Number,
        required:true
    },
    ironQty:{
        type:Number,
        required:true
    },
    dryQty:{
        type:Number,
        required:true
    },
    description:{
        type:String,
    },
    totalAmount:{
        type:Number,
        required:true
    },
    paymentStatus:{
        type:String,
        required:true
    },
    laundryStatus:{
        type:String,
        required:true
    }

})

const Invoice = new mongoose.model("Invoice",invoiceSchema);
module.exports = Invoice;