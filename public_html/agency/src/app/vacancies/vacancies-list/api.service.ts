import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Vaccancies } from './vaccancies-list';
import { Observable } from 'rxjs';

const localUrl = 'assets/data/vaccancies-data.json';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  getVaccancyData(): Observable<HttpResponse<Vaccancies[]>> {
    return this.http.get<Vaccancies[]>(
      localUrl, { observe: 'response' });
  }
  constructor(private http: HttpClient) { }
}
