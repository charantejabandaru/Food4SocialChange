export class Volunteer{
    volunteerName: String;
    volunteerMobileNumber : String;
    status : String;
    city : String;
    area : String;
    email : String;
    password : String;
    donorMobileNumber: String;

    constructor(volunteerName: String,
        volunteerMobileNumber : String,
        status : String,
        city : String,
        area : String,
        email : String,
        password : String,
        donorMobileNumber: String

       ){
        this.volunteerName =volunteerName;
        this.volunteerMobileNumber = volunteerMobileNumber;
        this.status = status;
        this.city = city;
        this.area = area;
        this.email = email;
        this.password = password;
        this.donorMobileNumber = donorMobileNumber
    }


}