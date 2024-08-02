import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router';
import { NotifyDonationDelivery } from '../shared/notify-donation-delivery.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  volunteerMobileNumber  = new  FormControl('');
  password = new FormControl('');

  constructor(private authService : AuthenticationService,private router : Router, private notifyDeliveryService : NotifyDonationDelivery) { 

  }

  ngOnInit(): void {
  }

  login(){
    let credentials = {username : this.volunteerMobileNumber.value!,password : this.password.value!};
    console.log("the credentials are : "+ this.volunteerMobileNumber.value!);
    this.authService.login(credentials).subscribe((res : any)=>{
      console.log("this is the token"+res.token);
      localStorage.clear();
      localStorage.setItem('token',res.token);
      if(res.token){
        this.router.navigate(['/dashboard']);
      }
    },(error :any)=>{
      console.error(error);
    });
  }

}
