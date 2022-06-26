const mongoose = require("mongoose");
const  mongodbURL = `mongodb+srv://${process.env.USER}:${process.env.PWD}@cluster0.tcrvm.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(mongodbURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(() => {
    console.log(`connection succesfull`);
}).catch((e) => {
    console.log(`no connection`);
})