import {HttpClient, HttpErrorResponse,HttpHeaders,HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Donation} from './donation.model';
import {Volunteer} from './volunteer.model';
import { catchError } from 'rxjs/operators';
import {Observable , throwError} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DonationsService {
    private baseUrl: string = "http://localhost:3000/donations";
    private  token ; // Retrieve the stored token from local storage
    

    constructor(private http: HttpClient){
        this.token = localStorage.getItem('token');
    }

    getDonations() : Observable<Donation[]>{
        const headers = new HttpHeaders({
            "Authorization": ""+this.token
        });
        console.log("get donation service is called");
        return this.http.get<Donation[]>(this.baseUrl,{headers}).pipe(catchError(this.handleError));
    }

    raiseDonation(donation : Donation) : Observable<any>{
        return this.http.post(this.baseUrl,donation);
    }

    acceptDonation(donation : Donation): Observable<any>{
        const headers = new HttpHeaders({
            "Authorization": ""+this.token
        });
        
        return this.http.put(this.baseUrl+'/accept',donation,{headers});
    }   

    pickUpDonation(donation : Donation):Observable<any>{
        const headers = new HttpHeaders({
            "Authorization": ""+this.token
        });
        return this.http.put(this.baseUrl+'/pickup',donation,{headers});
    }   

    deliverDonation(donation : Donation){
        const headers = new HttpHeaders({
            "Authorization": ""+this.token
        });
        return this.http.put(this.baseUrl+'/deliver',donation,{headers});
    }
    assignVolunteer(donation:Donation) :Observable<any>{
        const headers = new HttpHeaders({
            "Authorization": ""+this.token
        });
        return this.http.put(this.baseUrl+'/addvolunteer',donation,{headers});
        
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        console.error('An error occurred:', error);
        return throwError('Something went wrong. Please try again later.');
    }
}