import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router'; 
import { VolunteerService } from '../shared/volunteer.service';
import { Volunteer } from './volunteer';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  volunteerName =  new FormControl('');
  volunteerMobileNumber = new FormControl('');
  status = 'available';
  city = new FormControl('');
  area = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');
  donorMobileNumber = '';

  showLogin : boolean = true;
  constructor(private router : Router, private volunteerService: VolunteerService) { }

  ngOnInit(): void {
  }

  addVolunteer(): void{
    if(this.isValid()){
    let volunteer  =  new Volunteer(
      this.volunteerName.value! ,
      this.volunteerMobileNumber.value! ,
      this.status, 
      this.city.value! ,
      this.area.value! ,
      this.email.value! ,
      this.password.value!,
      this.donorMobileNumber);

      this.volunteerService.addVolunteer(volunteer).subscribe(response => {
        console.log("volunteer added"+response);
        this.router.navigate(['/']);
      },error => {
        console.log("error occured"+error);
      });
    }
  }

  isValid():boolean{
    return this.volunteerName.value!='' && this.volunteerMobileNumber.value!='' && this.volunteerMobileNumber.value?.length==10 && this.city.value!='' && this.area.value!='' && this.email.value!='' && this.password.value!='';
  }
}
