export class Donation{
    donorName : string;
    donorMobileNumber : string;
    pickupAddress : string;
    status : string;
    city : string;
    area : string;
    foodType : string;
    foodQuantity : string;
    recipientMobileNumber : string;

    constructor(donorName : string,
        donorMobileNumber : string,
        pickupAddress : string,
        status : string,
        city : string,
        area : string,
        foodType : string,
        foodQuantity : string,
        recipientMobileNumber : string){
            this.donorName = donorName;
            this.donorMobileNumber = donorMobileNumber;
            this.pickupAddress = pickupAddress,
            this.status = status;
            this.city = city;
            this.area = area;
            this.foodType = foodType;
            this.foodQuantity = foodQuantity;
            this.recipientMobileNumber = recipientMobileNumber;
        }
}