import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router'; 
import { DonationsService } from '../shared/donations.service';
import { Donation } from '../shared/donation';

@Component({
  selector: 'donation-page',
  templateUrl: './donation-page.component.html',
  styleUrls: ['./donation-page.component.css']
})
export class DonationPageComponent implements OnInit {

    donorName =  new FormControl('');
    donorMobileNumber = new FormControl('');
    pickupAddress = new FormControl('');
    status = 'raised';
    city = new FormControl('');
    area = new FormControl('');
    foodType = new FormControl('');
    foodQuantity = new FormControl('');
    recipientMobileNumber = new FormControl('');

  constructor(private router : Router, private donationsService: DonationsService) { }

  ngOnInit(): void {
  }

  raiseDonation(): void{
    if(this.isValid()){
    let donation  =  new Donation(
      this.donorName.value! ,
      this.donorMobileNumber.value! ,
      this.pickupAddress.value! ,
      this.status, 
      this.city.value! ,
      this.area.value! ,
      this.foodType.value! ,
      this.foodQuantity.value! ,
      this.recipientMobileNumber.value!);

      this.donationsService.raiseDonation(donation).subscribe(response => {
        console.log("Donation raised");
        this.router.navigate(['/']);
      },error => {
        console.log("error occured");
      });
    }
  }

  isValid():boolean{

    return this.donorName.value!='' && this.donorMobileNumber.value!='' && this.pickupAddress.value!=null
    && this.city.value!='' && this.area.value!='' && this.foodType.value!='' && this.foodQuantity.value!='';
  }

}
