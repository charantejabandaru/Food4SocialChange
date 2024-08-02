import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router'; 
import { RecipientService } from '../shared/recipient.service';
import { Recipient } from './recipient';

@Component({
  selector: 'recipient-form',
  templateUrl: './recipient-form.component.html',
  styleUrls: ['./recipient-form.component.css']
})
export class RecipientFormComponent implements OnInit {

  recipientName =  new FormControl('');
  recipientMobileNumber = new FormControl('');
  deliveryLocation = new FormControl('');
  city = new FormControl('');
  area = new FormControl('');
  lastUpdatedTimeStamp = "1";
  errorMessage = "";

  constructor(private router : Router,private recipientService : RecipientService) { }

  ngOnInit(): void {
  }

  createRecipient(): void{
    if(this.isValid()){
        this.errorMessage = "";
        let recipient  =  new Recipient(
        this.recipientName.value! ,
        this.recipientMobileNumber.value! ,
        this.deliveryLocation.value! , 
        this.area.value! ,
        this.city.value!,
        this.lastUpdatedTimeStamp);

        this.recipientService.createRecipient(recipient).subscribe(response => {
          let message = '';
          if(response.result==true){
            message = "Recipient Added SuccessFully";
            console.log(message);
            this.router.navigate(['/dashboard'],{queryParams : {message : message}});
          }
          else if(response.result==false){
            this.errorMessage = "RecipientAlreadyExists";
            console.log(this.errorMessage);
          }
        },error => {
          console.log("error occured: " + error);
        });
    }
    else{
      this.errorMessage = "Invalid Fields";
      console.log(this.errorMessage);
    }
  }

  isValid():boolean{
    return this.recipientName.value!='' && this.recipientMobileNumber.value!='' && this.recipientMobileNumber.value!='' && this.deliveryLocation.value?.length==10
    && this.city.value!='' && this.area.value!='';
  }

}
