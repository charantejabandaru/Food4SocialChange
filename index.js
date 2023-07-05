require("dotenv").config();

const cors = require('cors');


const express = require("express");

const mongoose = require("mongoose");

const donationModel = require("./donation");

const volunteerModel = require("./volunteer");

const recipientModel = require("./recipient");

const status = require("./status");

var bodyparser = require("body-parser");

const app = express();

app.use(cors({
    origin: '*'
}));
app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());

mongoose.connect(process.env.MONGO_URL, 
{
        useNewUrlParser: true, 
        useUnifiedTopology: true
}).then(()=>{console.log("connected")});

/*app.get("/",async (req,res) => {
    const getAllData = await donationModel.find();
    return res.json({donations: getAllData});
});

app.get("/",async (req,res) => {
    const getAllData = await donationModel.find();
    return res.json({donations: getAllData});
});*/

app.get("/donations/:city/:area",async (req,res)=>{
    const donations = await donationModel.find({city : req.params.city,area : req.params.area});
    console.log(donations);
    return res.json(donations);
});

app.put("/donations/accept",async (req,res)=>{
    const donation= await donationModel.findOneAndUpdate(
        {
            donorMobileNumber : req.body.donorMobileNumber
           
        },
        {
            status : status.donationStatus.accepted
        },
        {
            new : true
        }
        );

    const volunteer = await volunteerModel.findOneAndUpdate({ volunteerMobileNumber : '7093180389' /*add loggedInUser's mobileNumber here*/,
        },
        { status : status.volunteerStatus.assigned,
          donorMobileNumber : req.body.donorMobileNumber},{ new : true});
    return res.json(donation);
});
/*
app.put("/donations/accept/:mobileNumber/:area/:city/addvolunteer",async (req,res)=>{
    const volunteer = await volunteerModel.findOneAndUpdate({ status : status.volunteerStatus.available,
        city : req.params.city,
        area : req.params.area
    },
    { status : status.volunteerStatus.assigned,
      donorMobileNumber : req.params.mobileNumber},{ new : true}
    );
    
    return res.json({volunteer : volunteer});
});*/

app.put("/donations/pickup",async (req,res)=>{
    const donation= req.body;
   
    const eligibleRecipient = await recipientModel.findOne({
        lastUpdatedTimeStamp : "1",
        area : donation.area,
        city : donation.city
    });
    if(!eligibleRecipient){
        const recipientSample = await recipientModel.updateMany({
            lastUpdatedTimeStamp : "2",
            area : donation.area,
            city : donation.city
        },
        {
            lastUpdatedTimeStamp : "1"
        },
        {
            new : true
        });
    }
    const recipient = await recipientModel.findOne({
        lastUpdatedTimeStamp : "1",
        area : donation.area,
        city : donation.city
    });

    const donationFinal= await donationModel.findOneAndUpdate(
        {
            donorMobileNumber : req.body.donorMobileNumber
        },
        {
            status : status.donationStatus.pickedup,
            recipientMobileNumber : recipient.recipientMobileNumber
        },
        {
            new : true
        }
        );

    return res.json({donation:donationFinal,recipient : recipient});
});
 
app.put("/donations/deliver",async (req,res)=>{
    const donation= await donationModel.findOne(
        {
            donorMobileNumber : req.body.donorMobileNumber
        }
        );
    const updateRecipient = await recipientModel.findOneAndUpdate({recipientMobileNumber : donation.recipientMobileNumber},
        {
            lastUpdatedTimeStamp : "2"
        },
        {
            new : true
        });
    await donationModel.deleteOne({donorMobileNumber : req.body.donorMobileNumber});
    const volunteer = await volunteerModel.updateMany({ donorMobileNumber: req.body.donorMobileNumber},
        {
            status : status.volunteerStatus.available,
            donorMobileNumber : ""
        },
        {
            new : true 
        }
        );
    return res.json("donation Delivered Successfully");
});

app.post("/donations",async (req,res) => {
    /*const newDonation = {
        donorName: "ravi Teja",
        donorMobileNumber : "7032994188",
        pickupAddress: "Pragathi Nagar", 
        status : "raised",
        city : "Hyderabad",
        area : "Kukatpally",
        foodType : "Non-veg",
        foodQuantity : "100 plates",
        recipientMobileNumber: ""
    };*/
    const newDonation = req.body;
    donationModel.create(newDonation);
    return res.json({message :"donation raised succesfully"});
},(error)=>{
    if(error){
        console.log(error);
    }
}); 

app.post("/volunteers",async (req,res) => {


   /* const newvolunteer = {
        volunteerName: "Harish",
        volunteerMobileNumber : "7373737373",
        status : status.volunteerStatus.assigned,
        city : "Hyderabad",
        area : "Kukatpally",
        email : "", 
        password : "",
        donorMobileNumber: "7032994189"
    };*/
    const newvolunteer = req.body;
    await volunteerModel.create(newvolunteer);
    return res.json({message :"volunteer signedup succesfully"});
},(error)=>{
    if(error){
        console.log(error);
    }
}); 

app.post("/recipients",async (req,res) => {
    const newRecipient = req.body;
    const isRecipientExists = await recipientModel.findOne({ recipientMobileNumber : newRecipient.recipientMobileNumber});
    if(isRecipientExists){
        return res.json({result : false });
    }
    else{
        await recipientModel.create(newRecipient);
        return res.json({result : true});
    }
},(error)=>{
    if(error){
        console.log(error);
        return error;
    }
});

app.listen(3000,() => {
        console.log("server is running on port 3000");
});