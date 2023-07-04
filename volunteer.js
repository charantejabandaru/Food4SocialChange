const mongoose = require("mongoose");

const volunteerSchema = mongoose.Schema(
    {
        volunteerName: String,
        volunteerMobileNumber : String,
        status : String,
        city : String,
        area : String,
        volunteerEmail : String,
        volunteerPassword : String,
        donorMobileNumber: String
    }
);

const volunteerModel = mongoose.model("volunteers",volunteerSchema);

module.exports = volunteerModel;