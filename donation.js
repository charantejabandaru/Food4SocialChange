const mongoose = require("mongoose");

const donationSchema = mongoose.Schema(
    {
        donorName: String,
        donorMobileNumber : String,
        pickupAddress: String,
        status : String,
        city : String,
        area : String,
        foodType : String,
        foodQuantity : String,
        recipientMobileNumber: String
    } 
);

const donationModel = mongoose.model("donations",donationSchema);

module.exports = donationModel;