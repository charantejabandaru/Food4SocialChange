import {HttpClient, HttpErrorResponse,HttpHeaders,HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Recipient} from './recipient.model';
import { catchError } from 'rxjs/operators';
import {Observable , throwError} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RecipientService {
    private baseUrl: string = "http://localhost:3000/recipients";

    constructor(private http: HttpClient){}

    createRecipient(recipient : Recipient): Observable<any>{
        return this.http.post(this.baseUrl,recipient).pipe(catchError(this.handleError));
    }

    updateRecipient(recipient : Recipient): Observable<any>{
        return this.http.post(this.baseUrl,recipient);
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        console.error('An error occurred:', error);
        return throwError('Something went wrong. Please try again later.');
    }
}