require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const donationModel = require("./donation");

const volunteerModel = require("./volunteer");

const recipientModel = require("./recipient");

var bodyparser = require("body-parser");

const foody = express();

foody.use(bodyparser.urlencoded({extended : true}));
foody.use(bodyparser.json());

mongoose.connect(process.env.MONGO_URL, 
{
        useNewUrlParser: true, 
        useUnifiedTopology: true
}).then(()=>{console.log("connected")});

foody.get("/",async (req,res) => {
    const getAllData = await donationModel.find();
    return res.json({donations: getAllData});
});

foody.post("/new",async (req,res) => {
    const newDonation = {
        donorName: "Charan Teja",
        donarMobileNumber : "7032994189",
        pickupAddress: "Pragathi Nagar", 
        status : "Raised",
        city : "Hyderabad",
        area : "Kukatpally",
        foodType : "Non-veg",
        foodQuantity : "100 plates",
        recipientMobileNumber: ""
    };
    donationModel.create(newDonation);
    return res.json({message :"donation raised succesfully"});
}); 

foody.listen(3000,() => {
        console.log("server is running on port 3000");
});