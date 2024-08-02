import {Injectable,EventEmitter} from '@angular/core';

@Injectable({providedIn:'root'})
export class NotifyDonationDelivery{
    donationDelivered = new EventEmitter<void>();

    constructor(){}

    triggerDonationDelivered(){
        console.log('triggered Donation Delivered');
        this.donationDelivered.emit();
    }
}