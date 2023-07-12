require("dotenv").config();

const cors = require('cors');


const express = require("express");

//const session = require("express-session");

const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const donationModel = require("./donation");

const volunteerModel = require("./volunteer");

const recipientModel = require("./recipient");

const status = require("./status");

var bodyparser = require("body-parser");

const app = express();

/*app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
  }));*/

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

const secretKey = process.env.secretKey;

/*app.get("/",async (req,res) => {
    const getAllData = await donationModel.find();
    return res.json({donations: getAllData});
});

app.get("/",async (req,res) => {
    const getAllData = await donationModel.find();
    return res.json({donations: getAllData});
});*/

/*async function requireAuth(req, res, next) {
    if (req.session.volunteerMobileNumber) {
      // User is authenticated, proceed to the next middleware
      next();
    } else {
      // User is not authenticated, redirect to login or send an error response
      res.sendStatus(401);
    }
  }*/
  
  // Verify JWT token middleware
  function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      req.user = decoded.username;
      next(); 
    });
  }

app.post("/login",async (req,res) => {
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
});

/*app.get('/logout', async (req, res) => {
    req.session.destroy(); 
    res.sendStatus(200);
  });*/


app.get("/donations",verifyToken,async (req,res)=>{
    console.log("the mobile number is "+req.user);
    const volunteer = await volunteerModel.findOne({volunteerMobileNumber : req.user});
    const donations = await donationModel.find({ city : volunteer.city,area : volunteer.area});
    console.log(donations);
    return res.json(donations);
});
 
app.put("/donations/accept",verifyToken,async (req,res)=>{
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

app.put("/donations/addvolunteer",verifyToken,async (req,res)=>{

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
});
app.put("/donations/pickup",verifyToken,async (req,res)=>{
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
 

app.put("/donations/deliver",verifyToken,async (req,res)=>{
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