import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import {catchError} from 'rxjs/internal/operators';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { 
    
  }
  get(url:any) {
    return this.http.get(url);
  }
  post(url:any,post_data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/html',
        'Authorization': 'jwt-token'
      })
    };
    url = environment.APIUrl + '/' + url;
    return this.http.post<any>(url, post_data, httpOptions);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }
}
