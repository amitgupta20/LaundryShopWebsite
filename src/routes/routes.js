const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Invoice = require("../models/invoice");
const Slot = require("../models/slot");
const Rate = require("../models/rate");

// HomePage without login/landing homepage
router.get('/',async(req,res) => {    
    try {
        // const slotData = new Slot({
        //     id:1,
        //     washTime:"Sun Dec 26 2021 10:00:00 GMT+0530 (India Standard Time)",
        //     ironTime:"Sun Dec 26 2021 10:00:00 GMT+0530 (India Standard Time)",
        //     dryTime:"Sun Dec 26 2021 10:00:00 GMT+0530 (India Standard Time)",
        //     openingTime:"10:00 AM",
        //     closingTime:"8:00 PM"
        // })
        // await slotData.save();
        // const rateData = new Rate({
        //     id:1,
        //     simpleWash:20,
        //     woolenWash:45,
        //     blanketWash:55,
        //     plainIron:15,
        //     delicateIron:35,
        //     sandIron:45,
        //     normalDry:55,
        //     sodaDry:105,
        //     woolenDry:90
        // })
        // await rateData.save();
        
        var dateIndia1 = new Date();
        var dateIndia2 = new Date();
        var dateIndia3 = new Date();
        var inv = await Slot.findOne({id:1});
        const rates = await Rate.findOne({id:1});
        var expectedWashTime = new Date(inv.washTime);
        var expectedIronTime = new Date(inv.ironTime);
        var expectedDryTime = new Date(inv.dryTime);
        if (expectedWashTime < dateIndia1) {
            expectedWashTime = dateIndia1;
        }
        if (expectedIronTime < dateIndia2) {
            expectedIronTime = dateIndia2;
        }
        if (expectedDryTime < dateIndia3) {
            expectedDryTime = dateIndia3;
        }
        await Slot.updateOne({ id:1}, {
            $set: {
                washTime:expectedWashTime.toString(),
                ironTime:expectedIronTime.toString(),
                dryTime:expectedDryTime.toString()
            }
        });
        return res.render('index',{
            washTime:`${expectedWashTime.toString().substring(0,25)}`,
            ironTime:`${expectedIronTime.toString().substring(0,25)}`,
            dryTime:`${expectedDryTime.toString().substring(0,25)}`,
            openingTime:inv.openingTime,
            closingTime:inv.closingTime,
            rates:rates
        });

    } catch (error) {
        return res.render('loadingFiles',{
            heading:"Error Occured",
            value1:"",
            value2:error,
            value3:"",
            value4:"",
            value5:"",
            value6:"",
            link:"/"
        });
    }
});

// signup page
router.get('/signUp',(req,res) => {
    res.render('signUp');
});

// login page
router.get('/login',(req,res) => {
    res.render('login');
});

router.get('/adminHomePage',(req,res) => {
    res.render('adminHomePage');
});

router.get('/empHomePage',(req,res) => {
    res.render('empHomePage');
});

router.get('/acceptRequest',(req,res) => {
    res.render('acceptRequest');
});

router.get('/generateInvoice',(req,res) => {
    res.render('generateInvoice');
});

router.get('/changeRatesAndTime',async(req,res) => {
    try {
        const rates = await Rate.findOne({id:1});
        const slots = await Slot.findOne({id:1});
        return res.render('changeRatesAndTime',{
            rates:rates,
            slots:slots
        });
        
    } catch (error) {
        return res.render('loadingFiles',{
            heading:"Error Occured",
            value1:"",
            value2:"",
            value3:error,
            value4:"",
            value5:"",
            value6:"",
            link:"/changeRatesAndTime"
        });
    }
});

router.post('/updateDB',async(req,res) => {
    try {
        await Slot.updateOne({ id:1}, {
            $set: {
                openingTime:req.body.openingTime,
                closingTime:req.body.closingTime
            }
        });
        await Rate.updateOne({ id:1}, {
            $set: {
                simpleWash:req.body.simpleWash,
                woolenWash:req.body.woolenWash,
                blanketWash:req.body.blanketWash,
                plainIron:req.body.plainIron,
                delicateIron:req.body.delicateIron,
                sandIron:req.body.sandIron,
                normalDry:req.body.normalDry,
                sodaDry:req.body.sodaDry,
                woolenDry:req.body.woolenDry
            }
        });
        return res.render('loadingFiles',{
            heading:"Updated",
            value1:"",
            value2:"",
            value3:"Details Updated SuccessFully",
            value4:"",
            value5:"",
            value6:"",
            link:"/adminHomePage"
        });       
        
    } catch (error) {
        return res.render('loadingFiles',{
            heading:"Error Occured",
            value1:"",
            value2:"",
            value3:error,
            value4:"",
            value5:"",
            value6:"",
            link:"/changeRatesAndTime"
        });
    }
});

router.post("/signUp",async(req,res) => {
    try {
        const password = req.body.password;
        const cPassword = req.body.cpassword;
        if(password === cPassword){
            const userData = new User({
                accountType: req.body.userType,
                fullName: req.body.firstname,
                contactNum: req.body.contactNum,
                address: req.body.address,
                aadhar: req.body.aadhar,
                email: req.body.email,
                password: req.body.password,
                accountStatus: false
            })
            const checkData = await User.find({contactNum:req.body.contactNum});
            if(checkData.length == 0){
                const registered = await userData.save(); 
                return res.render('loadingFiles',{
                    heading:"Registration Successful",
                    value1:"Have a  Nice Day!!",
                    value2:"",
                    value3:"",
                    value4:"",
                    value5:"",
                    value6:"",
                    link:"/"
                });
            }else{
                return res.render('loadingFiles',{
                    heading:"Duplicate Entries",
                    value1:"",
                    value2:"Mobile Number is already registered with us.",
                    value3:"",
                    value4:"",
                    value5:"",
                    value6:"",
                    link:"/signUp"
                });
            }
        }else{
            return res.render('loadingFiles',{
                heading:"Invalid Entries",
                value1:"Password should be same in field",
                value2:"or enter Valid email or mobile number",
                value3:"",
                value4:"",
                value5:"",
                value6:"",
                link:"/signUp"
            });
        }
    } catch (error) {
        console.log(error);
        return res.render('loadingFiles',{
            heading:"Error Occured",
            value1:"",
            value2:error,
            value3:"",
            value4:"",
            value5:"",
            value6:"",
            link:"/signUp"
        });
    }
})

router.post("/login",async(req,res) => {
    try {
        // var accountType = req.body.userType;
        
        var contactNum = req.body.contactNum;
        var password = req.body.password;
        const userData = await User.findOne({contactNum:contactNum});
        if(userData === null){
            return res.render('loadingFiles',{
                heading:"Invalid Credentials",
                value1:"",
                value2:"",
                value3:"",
                value4:"",
                value5:"",
                value6:"",
                link:"/login"
            });
        }
        if(userData.password === password){
            if(userData.accountStatus === false){
                return res.render('loadingFiles',{
                    heading:"Access Denied",
                    value1:"Your account is currently not activated or deactivated!",
                    value2:"",
                    value3:"Contact to Laundry Shop for further details.",
                    value4:"",
                    value5:"",
                    value6:"",
                    link:"/login"
                });
            }else{
                if(userData.accountType == "admin"){                
                    return res.redirect('/adminHomePage');            
                }else if(userData.accountType == "employee"){
                    return res.redirect('/empHomePage');
                }else{
                    Invoice.find({ contactNum: userData.contactNum}).exec((err, users) => {
                        if(err){
                            res.json({ message: err.message });
                        } else {
                            res.render('memberHomePage', {
                                name : userData,
                                users: users,
                            });
                        } 
                    });
                    // console.log(userData._id);
                    // res.render('memberHomePage',{
                    //     uid:userData._id,
                    //     name:userData.fullName,
                    //     contact:userData.contactNum
                    // });

                    // res.redirect('/member/'+userData._id);
                } 
            }

                           
        }else{
            return res.render('loadingFiles',{
                heading:"Invalid Credentials",
                value1:"",
                value2:"",
                value3:"",
                value4:"",
                value5:"",
                value6:"",
                link:"/login"
            });
        }

    } catch (error) {
        return res.render('loadingFiles',{
            heading:"Error Occured",
            value1:"",
            value2:error,
            value3:"",
            value4:"",
            value5:"",
            value6:"",
            link:"/login"
        });
    }
})

router.get('/member/:id',async(req,res) => {
    try {
        let id = req.params.id;
        var userData = await User.findById(id);
        res.render('memberHomePage',{
            uid:userData._uid,
            name:userData.fullName,
            contact:userData.contactNum
        });
        Invoice.find({ contactNum: userData.contactNum}).exec((err, users) => {
            if(err){
                res.json({ message: err.message });
            } else {
                res.render('history', {
                    name : userData,
                    users: users,
                });
            } 
        });        
        
    } catch (error) {
        return res.render('loadingFiles',{
            heading:"Error Occured",
            value1:"",
            value2:error,
            value3:"",
            value4:"",
            value5:"",
            value6:"",
            link:"/"
        });
    }   
});

router.get("/allLaundry", (req, res) => {
    try {
        Invoice.find().exec((err, users) => {
            if(err){
                res.json({ message: err.message });
            } else {
                res.render('allLaundry', {
                    users: users,
                });
            } 
        });
        
    } catch (error) {
        return res.render('loadingFiles',{
            heading:"Error Occured",
            value1:"",
            value2:error,
            value3:"",
            value4:"",
            value5:"",
            value6:"",
            link:"/"
        });
    }
    
});
router.get("/pendingLaundry", (req, res) => {
    try {
        Invoice.find({
            $or: [
              {paymentStatus:"Pending"},
              {laundryStatus:"Pending"}
            ]
          }).exec((err, users) => {
            if(err){
                res.json({ message: err.message });
            } else {
                res.render('pendingLaundries', {
                    users: users,
                });
            } 
        });
        
    } catch (error) {
        return res.render('loadingFiles',{
            heading:"Error Occured",
            value1:"",
            value2:error,
            value3:"",
            value4:"",
            value5:"",
            value6:"",
            link:"/"
        });
    }
    
});

router.get('/paid/:id',(req,res) => {
    try {
        let id = req.params.id;
        Invoice.findByIdAndUpdate(id,{paymentStatus:"Completed"},(err) => {
            if(err){
                res.json({message: err.message});
            }else{
                req.session.message = {
                    type:'Success',
                    message: 'Payment Status Updated Successfully!'
                }
                res.redirect('/pendingLaundry');
            }
        });        
        
    } catch (error) {
        return res.render('loadingFiles',{
            heading:"Error Occured",
            value1:"",
            value2:error,
            value3:"",
            value4:"",
            value5:"",
            value6:"",
            link:"/"
        });
    }   
});
router.get('/laundryCompleted/:id',(req,res) => {
    try {
        let id = req.params.id;
        Invoice.findByIdAndUpdate(id,{laundryStatus:"Completed"},(err) => {
            if(err){
                res.json({message: err.message});
            }else{
                req.session.message = {
                    type:'Success',
                    message: 'Payment Status Updated Successfully!'
                }
                res.redirect('/pendingLaundry');
            }
        });        
        
    } catch (error) {
        return res.render('loadingFiles',{
            heading:"Error Occured",
            value1:"",
            value2:error,
            value3:"",
            value4:"",
            value5:"",
            value6:"",
            link:"/"
        });
    }
    
    
});

// Account Request Table
router.get("/pendingAccount", (req, res) => {
    try {
        User.find({
            accountStatus:false
          }).exec((err, users) => {
            if(err){
                res.json({ message: err.message });
            } else {
                res.render('pendingAccount', {
                    users: users,
                });
            } 
        });
        
    } catch (error) {
        return res.render('loadingFiles',{
            heading:"Error Occured",
            value1:"",
            value2:error,
            value3:"",
            value4:"",
            value5:"",
            value6:"",
            link:"/"
        });
    }
    
});

router.get('/acceptAccount/:id',(req,res) => {
    try {
        let id = req.params.id;
        User.findByIdAndUpdate(id,{accountStatus:true},(err) => {
            if(err){
                res.json({message: err.message});
            }else{
                req.session.message = {
                    type:'Success',
                    message: 'Account Activated Successfully!'
                }
                res.redirect('/pendingAccount');
            }
        });        
        
    } catch (error) {
        return res.render('loadingFiles',{
            heading:"Error Occured",
            value1:"",
            value2:error,
            value3:"",
            value4:"",
            value5:"",
            value6:"",
            link:"/"
        });
    }   
});

router.get('/deleteAccount/:id',(req,res) => {
    try {
        let id = req.params.id;
        User.findByIdAndDelete(id,(err) => {
            if(err){
                res.json({message: err.message});
            }else{
                req.session.message = {
                    type:'Success',
                    message: 'Account Deleted Successfully!'
                }
                res.redirect('/pendingAccount');
            }
        });        
        
    } catch (error) {
        return res.render('loadingFiles',{
            heading:"Error Occured",
            value1:"",
            value2:error,
            value3:"",
            value4:"",
            value5:"",
            value6:"",
            link:"/pendingAccount"
        });
    }   
});
router.get('/viewUserDetails/:id',async(req,res) => {
    try {
        let id = req.params.id;
        const user = await User.findOne({contactNum:id});
        if(user === null){
            res.render('loadingFiles',{
                heading:"Account Details",
                value1:`User is Not our Member`,
                value2:`Contact Number = ${id} `,
                value3:``,
                value5:"",
                value4:"",
                value6:"",
                link:"/pendingAccount"
            });
        }else{
            res.render('loadingFiles',{
                heading:"Account Details",
                value1:`${user.fullName}`,
                value2:`Contact Number = ${user.contactNum} `,
                value3:`Email ID = ${user.email}`,
                value5:`Address = ${user.address}`,
                value4:`Aadhar Card Number = ${user.aadhar}`,
                value6:`Account Request = ${user.accountType}`,
                link:"/pendingAccount"
            });

        }
        // let id = req.params.id;
        // User.findOne({contactNum:id},(err,user) => {
        //     if(user === null){
        //         res.render('loadingFiles',{
        //             heading:"Account Details",
        //             value1:`User is Not our Member`,
        //             value2:`Contact Number = ${id} `,
        //             value3:``,
        //             value5:"",
        //             value4:"",
        //             value6:"",
        //             link:"/allLaundry"
        //         });
        //     }
        //     if(err){
        //         res.json({message: err.message});
        //     }else{
        //         req.session.message = {
        //             type:'Success',
        //             message: 'Account Details!'
        //         }
        //         res.render('loadingFiles',{
        //             heading:"Account Details",
        //             value1:`${user.fullName}`,
        //             value2:`Contact Number = ${user.contactNum} `,
        //             value3:`Email ID = ${user.email}`,
        //             value5:`Address = ${user.address}`,
        //             value4:`Aadhar Card Number = ${user.aadhar}`,
        //             value6:`Account Request = ${user.accountType}`,
        //             link:"/pendingAccount"
        //         });
        //     }
        // });        
        
    } catch (error) {
        return res.render('loadingFiles',{
            heading:"Error Occured",
            value1:"",
            value2:error,
            value3:"",
            value4:"",
            value5:"",
            value6:"",
            link:"/"
        });
    }   
});

router.get('/viewBillDetails/:id',(req,res) => {
    try {
        let id = req.params.id;
        Invoice.findOne({billNum:id},(err,user) => {
            if(user === null){
                res.render('loadingFiles',{
                    heading:"Bill Details",
                    value1:`Invalid Bill Number`,
                    value2:``,
                    value3:``,
                    value5:"",
                    value4:"",
                    value6:"",
                    link:"/"
                });
            }
            if(err){
                res.json({message: err.message});
            }else{
                req.session.message = {
                    type:'Success',
                    message: 'Bill Details!'
                }
                res.render('loadingFiles',{
                    heading:"Bill Details",
                    value1:`Bill Number : ${user.billNum}`,
                    value3:`Description = ${user.description} `,
                    value4:`Payment Status = ${user.paymentStatus}`,
                    value5:`Laundry Status = ${user.laundryStatus}`,
                    value2:`Bill Amount = ${user.totalAmount}`,
                    value6:`Washing( Small=${user.wsQty} , Big=${user.wbQty} ),
                    Ironing=${user.ironQty} , DryCleaning=${user.dryQty}`,
                    link:"/login"
                });
            }
        });        
        
    } catch (error) {
        return res.render('loadingFiles',{
            heading:"Error Occured",
            value1:"",
            value2:error,
            value3:"",
            value4:"",
            value5:"",
            value6:"",
            link:"/"
        });
    }   
});

router.get('/viewUserDetails2/:id',async(req,res) => {
    try {
        let id = req.params.id;
        const user = await User.findOne({contactNum:id});
        if(user === null){
            res.render('loadingFiles',{
                heading:"Account Details",
                value1:`User is Not our Member`,
                value2:`Contact Number = ${id} `,
                value3:``,
                value5:"",
                value4:"",
                value6:"",
                link:"/allLaundry"
            });
        }else{
            res.render('loadingFiles',{
                heading:"Account Details",
                value1:`${user.fullName}`,
                value2:`Contact Number = ${user.contactNum} `,
                value3:`Email ID = ${user.email}`,
                value5:`Address = ${user.address}`,
                value4:`Aadhar Card Number = ${user.aadhar}`,
                value6:`Account Request = ${user.accountType}`,
                link:"/allLaundry"
            });

        }
        
    } catch (error) {
        return res.render('loadingFiles',{
            heading:"Error Occured",
            value1:"",
            value2:error,
            value3:"",
            value4:"",
            value5:"",
            value6:"",
            link:"/"
        });
    }   
});

router.get('/viewBillDetails2/:id',(req,res) => {
    try {
        let id = req.params.id;
        console.log(id);
        Invoice.findOne({billNum:id},(err,user) => {
            if(err){
                res.json({message: err.message});
            }else{
                req.session.message = {
                    type:'Success',
                    message: 'Bill Details!'
                }
                res.render('loadingFiles',{
                    heading:"Bill Details",
                    value1:`Bill Number : ${user.billNum}`,
                    value3:`Description = ${user.description} `,
                    value4:`Payment Status = ${user.paymentStatus}`,
                    value5:`Laundry Status = ${user.laundryStatus}`,
                    value2:`Bill Amount = ${user.totalAmount}`,
                    value6:`Washing( Small=${user.wsQty} , Big=${user.wbQty} ),
                    Ironing=${user.ironQty} , DryCleaning=${user.dryQty}`,
                    link:"/allLaundry"
                });
            }
        });        
        
    } catch (error) {
        return res.render('loadingFiles',{
            heading:"Error Occured",
            value1:"",
            value2:error,
            value3:"",
            value4:"",
            value5:"",
            value6:"",
            link:"/"
        });
    }   
});

router.post("/getPassword",async(req,res) => {
    try {
        var contactNum = req.body.contactNum;
        var aadhar = req.body.aadhar;
        const userData = await User.findOne({contactNum:contactNum});
        if(userData.aadhar == aadhar){
            return res.render('loadingFiles',{
                heading:"Password Recovered",
                value1:`Password for ${userData.fullName}'s Account is`,
                value2:`${userData.password}`,
                value3:"",
                value4:"",
                value5:"",
                value6:"",
                link:"/adminHomePage"
            });            
        }else{
            return res.render('loadingFiles',{
                heading:"Invalid Credentials",
                value1:"",
                value2:"",
                value3:"",
                value4:"",
                value5:"",
                value6:"",
                link:"/adminHomePage"
            });
        }

    } catch (error) {
        console.log(error);
        return res.render('loadingFiles',{
            heading:"Error Occured",
            value1:"",
            value2:error,
            value3:"",
            value4:"",
            value5:"",
            value6:"",
            link:"/adminHomePage"
        });
    }
});

router.post("/registerLaundry",async(req,res) => {
    try {
        // const slotData = new Slot({
        //     id:1,
        //     washTime:"Sun Dec 26 2021 10:00:00 GMT+0530 (India Standard Time)",
        //     ironTime:"Sun Dec 26 2021 10:00:00 GMT+0530 (India Standard Time)",
        //     dryTime:"Sun Dec 26 2021 10:00:00 GMT+0530 (India Standard Time)"
        // })
        // await slotData.save();
        // console.log("Go-there");
        var invNum = parseInt(await Invoice.find().countDocuments()) + 1;
        var description = req.body.wsDesc + ' ' + req.body.wbDesc + ' ' + req.body.ironDesc + ' ' + req.body.dryDesc;
        
        var dateIndia1 = new Date();
        var dateIndia2 = new Date();
        var dateIndia3 = new Date();
        //console.log(dateIndia1.toString());
        // console.log(parseInt(req.body.wsQty) + 3*parseInt(req.body.wbQty));
        var washAdder = 30*(Math.ceil((parseInt(req.body.wsQty) + 3*parseInt(req.body.wbQty))/5));
        var ironAdder = 10*parseInt(req.body.ironQty);
        var dryAdder = 60*(Math.ceil(parseInt(req.body.dryQty)/2));
        var inv = await Slot.findOne({id:1});
        var expectedWashTime = new Date(inv.washTime);
        var expectedIronTime = new Date(inv.ironTime);
        var expectedDryTime = new Date(inv.dryTime);
        var expectedTime;
        if (expectedWashTime < dateIndia1) {
            expectedWashTime = dateIndia1;
        }
        if (expectedIronTime < dateIndia2) {
            expectedIronTime = dateIndia2;
        }
        if (expectedDryTime < dateIndia3) {
            expectedDryTime = dateIndia3;
        } 
        expectedWashTime.setMinutes(expectedWashTime.getMinutes()+washAdder);
        expectedIronTime.setMinutes(expectedIronTime.getMinutes()+ironAdder);
        expectedDryTime.setMinutes(expectedDryTime.getMinutes()+dryAdder);     
        expectedTime = expectedWashTime;
        if(expectedTime < expectedIronTime){
            expectedTime = expectedIronTime;
        }
        if(expectedTime < expectedDryTime){
            expectedTime = expectedDryTime;
        }
        await Slot.updateOne({ id:1}, {
            $set: {
                washTime:expectedWashTime.toString(),
                ironTime:expectedIronTime.toString(),
                dryTime:expectedDryTime.toString()
            }
        });
        const invoiceData = new Invoice({
            billNum: invNum,
            contactNum: req.body.contactNumber,
            date: dateIndia1.toString(),
            wsQty: req.body.wsQty,
            wbQty: req.body.wbQty,
            ironQty: req.body.ironQty,
            dryQty: req.body.dryQty,
            description: description,
            totalAmount: req.body.totalAmount,
            paymentStatus: "Pending",
            laundryStatus: "Pending"
        })
        await invoiceData.save();
        var msg;
        const user = await User.findOne({contactNum:req.body.contactNumber});
        if(user === null){
            msg="Customer is not or member. Credit is not permitted!"
        }
        return res.render('loadingFiles',{
            heading:"Laundry Registered",
            value1:"",
            value2:`Bill Number assigned is ${invNum}`,
            value3:`Laundry will be finished till `,
            value4:`${expectedTime.toString().substring(0,25)}`,
            value5:msg,
            value6:"",            
            link:"/generateInvoice"
        }); 
    } catch (error) {
        return res.render('loadingFiles',{
            heading:"Error Occured",
            value1:"",
            value2:error,
            value3:"",
            value4:"",
            value5:"",
            value6:"",
            link:"/generateInvoice"
        });
    }
});

router.post("/updateLaundry",async(req,res) => {
    try {
        var invNumber = req.body.invNumber;
        var updateType = req.body.updateType;
        var invCount = parseInt(await Invoice.find().countDocuments());
        if(invCount >= invNumber){
            if(updateType === "amount"){
                await Invoice.updateOne({billNum:invNumber},{
                    $set : {
                        paymentStatus: "Completed"
                    }
                });
                
            }else if(updateType === "laundry"){
                await Invoice.updateOne({billNum:invNumber},{
                    $set : {
                        laundryStatus: "Completed"
                    }
                });
            }else{
                await Invoice.updateOne({billNum:invNumber},{
                    $set : {
                        paymentStatus: "Completed",
                        laundryStatus: "Completed"
                    }
                });
            }
            return res.render('loadingFiles',{
                heading:"Updated Invoice Details",
                value1:"Request have been successfully updated",
                value2:"Have a  Nice Day!!",
                value3:"",
                value4:"",
                value5:"",
                value6:"",
                link:"/empHomePage"
            }); 
            
        }else{
            return res.render('loadingFiles',{
                heading:"Invoice Doesn't Exists",
                value1:"",
                value2:"",
                value3:"",
                value4:"",
                value5:"",
                value6:"",
                link:"/empHomePage"
            });
        }

    } catch (error) {
        return res.render('loadingFiles',{
            heading:"Error Occured",
            value1:"",
            value2:error,
            value3:"",
            value4:"",
            value5:"",
            value6:"",
            link:"/empHomePage"
        });
    }
})

 
router.post("/checkStatus",async(req,res) => {
    try {       
        var contactNum = req.body.contactNum;
        var invNum = req.body.invNum;
        var invCount = parseInt(await Invoice.find().countDocuments());        
        if (invCount >= invNum) {
            var invData = await Invoice.findOne({billNum:invNum});            
            if(invData.contactNum == contactNum){
                return res.render('loadingFiles',{
                    heading:"Laundry Status",
                    value1:"",
                    value2:`Your laundry is ${invData.laundryStatus }.`,
                    value4:`Bill Amount  : ${invData.totalAmount}.`,
                    value6:`Payment for the Laundry is ${invData.paymentStatus}.`,
                    
                    value5:"",
                    value3:"",
                    link:"/"
                });
            }
            else{
                console.log("Invalid Contact Number");
                return res.render('loadingFiles',{
                    heading:"Invalid Credentials",
                    value1:"",
                    value2:"",
                    value3:"",
                    value4:"",
                    value5:"",
                    value6:"",
                    link:"/"
                });
            }
        } else {
            return res.render('loadingFiles',{
                heading:"Invalid Credentials",
                value1:"",
                value2:"",
                value3:"",
                value4:"",
                value5:"",
                value6:"",
                link:"/"
            });
        }


    } catch (error) {
        return res.render('loadingFiles',{
            heading:"Error Occured",
            value1:"",
            value2:error,
            value3:"",
            value4:"",
            value5:"",
            value6:"",
            link:"/"
        });
    }
})


router.get("/checkDueAmount/:id",async(req,res) => {
    try {
        let id = req.params.id;
        var wsQty = await Invoice.aggregate(
            [
                {
                    $match: {
                        $and: [
                            {
                                paymentStatus: { $eq: "Pending" },
                                contactNum: { $eq: id }
                            }
                        ]
                    }
                },
                { 
                    $group: { _id: null, total: { $sum: "$totalAmount" } } 
                }
            ]
        )
        if(wsQty.length === 0){
            return res.render('loadingFiles',{
                heading:"Amount Due",
                value1:"",
                value2:"No Pending Bill Available",
                value3:"",
                value4:"",
                value5:"",
                value6:"",
                link:"/login"
            });
        }else{
            return res.render('loadingFiles',{
                heading:"Amount Due",
                value1:"",
                value2:`Amount to be Paid = Rs. ${wsQty[0].total}`,
                value3:"",
                value4:"",
                value5:"",
                value6:"",
                link:"/login"
            });
        }
            
        
        
    } catch (error) {
        return res.render('loadingFiles',{
            heading:"Error Occured",
            value1:"",
            value2:error,
            value3:"",
            value4:"",
            value5:"",
            value6:"",
            link:"/memberDueAmount"
        });
    }
});

router.post("/authorizeAccount",async(req,res) => {
    try {
        var details = await User.findOne({contactNum:req.body.contactNum});
        if(details === null){
            return res.render('loadingFiles',{
                heading:"Invalid Contact Number",
                value1:"",
                value2:"Please Enter Valid Contact Number",
                value3:"",
                value4:"",
                value5:"",
                value6:"",
                link:"/acceptRequest"
            });          
            
        }else{
            
            if(req.body.updateType === "activate"){
                await User.updateOne({contactNum:req.body.contactNum},{
                    $set : {
                        accountStatus: true
                    }
                });
                return res.render('loadingFiles',{
                    heading:"Account Activated",
                    value1:"Request have been successfully updated",
                    value2:"Have a  Nice Day!!",
                    value3:"",
                    value4:"",
                    value5:"",
                    value6:"",
                    link:"/acceptRequest"
                });
            }else{
                await User.updateOne({contactNum:req.body.contactNum},{
                    $set : {
                        accountStatus: false
                    }
                });
                return res.render('loadingFiles',{
                    heading:"Account Deactivated",
                    value1:"Request have been successfully updated",
                    value2:"Have a  Nice Day!!",
                    value3:"",
                    value4:"",
                    value5:"",
                    value6:"",
                    link:"/acceptRequest"
                });
            }
             
        }

    } catch (error) {
        return res.render('loadingFiles',{
            heading:"Error Occured",
            value1:"",
            value2:error,
            value3:"",
            value4:"",
            value5:"",
            value6:"",
            link:"/acceptRequest"
        });
    }
});

module.exports = router;
