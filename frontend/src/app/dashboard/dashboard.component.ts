import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { DonationsService } from '../shared/donations.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private router : Router,private donationsService: DonationsService) { }

  ngOnInit(): void {
  }


  logout(): void{
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

}
