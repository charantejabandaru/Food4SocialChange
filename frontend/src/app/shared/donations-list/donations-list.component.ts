import {  Component, OnInit } from '@angular/core';
import { Donation } from '../donation.model';
import { DonationsService } from '../donations.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotifyDonationDelivery } from '../notify-donation-delivery.service';
import { Router } from '@angular/router';

@Component({
  selector: 'donations-list',
  templateUrl: './donations-list.component.html',
  styleUrls: ['./donations-list.component.css']
})
export class DonationsListComponent implements OnInit{

  public donations : Donation[] = [];
  public noMatchingResults : string = '';
  public isLoading : boolean  = false;
  public error : string = '';
  public showAllDonations : boolean = true;

  constructor(private donationsService : DonationsService,private notifyService : NotifyDonationDelivery, private router: Router) {
  }

   ngOnInit(): void {
    this.isLoading = true;
    this.notifyService.donationDelivered.subscribe(()=>{
        this.loadData();
    })
    this.loadData();
  }

  loadData(){
    this.donationsService.getDonations()
      .pipe(
        catchError((err) => {
          this.error = 'Failed to load donations. Please try again later.';
          if(err){
            this.router.navigate(["/login"]);
          }
          
          return throwError(err);
        })
      )
      .subscribe(
        (donations) => {
          this.donations = donations;
          console.log(donations);
          this.isLoading = false;
        }
    );
  }
}
