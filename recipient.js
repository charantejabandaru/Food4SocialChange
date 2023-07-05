const mongoose = require("mongoose");

const recipientSchema = mongoose.Schema(
    {
        recipientName: String,
        recipientMobileNumber : String,
        deliveryLocation : String,
        city : String,
        area : String,
        lastUpdatedTimeStamp : String,
        donorMobileNumber: String
    }
);

const recipientModel = mongoose.model("recipients",recipientSchema);

module.exports = recipientModel; 