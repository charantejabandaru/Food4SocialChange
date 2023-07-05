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

app.put("/donations/accept/:mobileNumber",async (req,res)=>{
    const donation= await donationModel.findOneAndUpdate(
        {
            donorMobileNumber : req.params.mobileNumber,
           
        },
        {
            status : status.donationStatus.accepted
        },
        {
            new : true
        }
        );

    const volunteer = await volunteerModel.findOneAndUpdate({ status : status.volunteerStatus.available,
            city : req.params.city,
            area : req.params.area
        },
        { status : status.volunteerStatus.assigned,
          donorMobileNumber : req.params.mobileNumber},{ new : true});

    return res.json(donation);
});

app.put("/donations/accept/:mobileNumber/:area/:city/addvolunteer",async (req,res)=>{
    const volunteer = await volunteerModel.findOneAndUpdate({ status : status.volunteerStatus.available,
        city : req.params.city,
        area : req.params.area
    },
    { status : status.volunteerStatus.assigned,
      donorMobileNumber : req.params.mobileNumber},{ new : true}
    );
    
    return res.json({volunteer : volunteer});
});

app.put("/donations/:mobileNumber/pickup",async (req,res)=>{
    const donation= await donationModel.findOneAndUpdate(
        {
            donorMobileNumber : req.params.mobileNumber
        },
        {
            status : status.donationStatus.pickedup
        },
        {
            new : true
        }
        );

    return res.json({donation : donation});
});

app.put("/donations/:mobileNumber/deliver",async (req,res)=>{
   /* const donation= await donationModel.findOneAndUpdate(
        {
            donorMobileNumber : req.params.mobileNumber
        },
        {
            status : status.donationStatus.delivered
        },
        {
            new : true
        }
        );*/
    await donationModel.deleteOne({donorMobileNumber : req.params.mobileNumber});
    const volunteer = await volunteerModel.updateMany({ donorMobileNumber: req.params.mobileNumber},
        {
            status : status.volunteerStatus.available,
            donorMobileNumber : ""
        },
        {
            new : true 
        }
        );
    return res.json({donation : donation});
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

app.post("/signup",async (req,res) => {


    const newvolunteer = {
        volunteerName: "Harish",
        volunteerMobileNumber : "7373737373",
        status : status.volunteerStatus.assigned,
        city : "Hyderabad",
        area : "Kukatpally",
        email : "",
        password : "",
        donorMobileNumber: "7032994189"
    };
  //  const newDonation = req.body;
    volunteerModel.create(newvolunteer);
    return res.json({message :"volunteer signedup succesfully"});
},(error)=>{
    if(error){
        console.log(error);
    }
}); 

app.listen(3000,() => {
        console.log("server is running on port 3000");
});