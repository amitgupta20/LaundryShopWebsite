//imports
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const req = require('express/lib/request');
const ejs = require("ejs");
const path = require("path");
const User = require("./models/users");
const Invoice = require("./models/invoice");
const Slot = require("./models/slot");


const app = express();
const PORT = process.env.PORT || 2000;
const { json } = require("express");
//datebase connection
require("./db/conn");

//middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended:false
}));


app.use(session({
    secret: 'my secret key',
    saveUninitialized:true,
    resave: false
}));

app.use((req,res,next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})
//
const static_path = path.join(__dirname,"../public");
app.use(express.static(static_path));

//set favicon

//set template engine
app.set("view engine","ejs");

app.use("",require("./routes/routes"));

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
