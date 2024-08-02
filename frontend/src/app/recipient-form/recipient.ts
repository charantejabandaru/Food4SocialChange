export class Recipient{
    recipientName : string;
    recipientMobileNumber : string;
    deliveryLocation : string;
    area : string;
    city : string;
    lastUpdatedTimeStamp :string;

    constructor( recipientName : string,
        recipientMobileNumber : string,
        deliveryLocation : string,
        area : string,
        city : string,
        lastUpdatedTimeStamp :string){
            this.recipientName = recipientName;
            this.recipientMobileNumber = recipientMobileNumber;
            this.deliveryLocation = deliveryLocation,
            this.area = area;
            this.city = city;
            this.lastUpdatedTimeStamp = lastUpdatedTimeStamp;
        }
}