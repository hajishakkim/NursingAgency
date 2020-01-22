import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientRate } from './client-rate-list';

const localUrl = 'assets/data/client-rate-data.json';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  getClientRateData(): Observable<HttpResponse<ClientRate[]>> {
    return this.http.get<ClientRate[]>(
      localUrl, { observe: 'response' });
  }
  constructor(private http: HttpClient) { }
}
