const jwt = require("jsonwebtoken");
const donationModel = require("../models/donation");
const volunteerModel = require("../models/volunteer");
const recipientModel = require("../models/recipient");
const status = require("../status");

exports.login = async (req,res) => {
    const volunteerCredentials = req.body;
    const authorizedUser = await volunteerModel.findOne({volunteerMobileNumber : volunteerCredentials.username,
    password : volunteerCredentials.password });
    const username = volunteerCredentials.username;
    if(authorizedUser){
        const token = jwt.sign({ username }, secretKey);
        return res.json({token});
    }
    else{ 
        return res.json({message: "user not found"});
    }
}

exports.register = async (req,res) => {
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
 }

 exports.getDonations = async (req,res)=>{
    console.log("the mobile number is "+req.user);
    const volunteer = await volunteerModel.findOne({volunteerMobileNumber : req.user});
    const donations = await donationModel.find({ city : volunteer.city,area : volunteer.area});
    console.log(donations);
    return res.json(donations);
}

exports.acceptDonation = async (req,res)=>{
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

    const volunteer = await volunteerModel.findOneAndUpdate({ volunteerMobileNumber : '7093180389',
        },
        { status : status.volunteerStatus.assigned,
          donorMobileNumber : req.body.donorMobileNumber},{ new : true});
    return res.json(donation);
}

exports.assignVolunteer = async (req,res)=>{

    /* const volunteer = await volunteerModel.findOneAndUpdate({ status : status.volunteerStatus.available,
         city : req.user.city,
         area : req.user.area
     },
     { status : status.volunteerStatus.assigned,
       donorMobileNumber : req.body.donorMobileNumber},{ new : true}
     );*/
     const user= await volunteerModel.findOne({volunteerMobileNumber : req.user});
     const volunteerTemp = await volunteerModel.findOne({ status : status.volunteerStatus.available,city : user.city, area: user.area});
     const volunteer =await volunteerModel.findOneAndUpdate({ volunteerMobileNumber : volunteerTemp.volunteerMobileNumber
     },
     { status : status.volunteerStatus.assigned,
       donorMobileNumber : req.body.donorMobileNumber},{ new : true});
     console.log(volunteer);
     return res.json({volunteer: volunteer}); 
 }

 exports.pickUpDonation = async (req,res)=>{
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
}

exports.deliverDonation = async (req,res)=>{
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
}

exports.donate = async (req,res) => {
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
}

exports.addRecipient = async (req,res) => {
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
}