import {HttpClient, HttpErrorResponse,HttpHeaders,HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Volunteer} from './volunteer.model';
import { catchError } from 'rxjs/operators';
import {Observable , throwError} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class VolunteerService {
    private baseUrl: string = "http://localhost:3000/volunteers";

    constructor(private http: HttpClient){}

    addVolunteer(volunteer : Volunteer): Observable<any>{
        return this.http.post(this.baseUrl,volunteer).pipe(catchError(this.handleError));
    }

    updateVolunteer(volunteer : Volunteer): Observable<any>{
        return this.http.post(this.baseUrl,volunteer);
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        console.error('An error occurred:', error);
        return throwError('Something went wrong. Please try again later.');
    }
}