import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { StaffList } from './staff-list';
import { Observable } from 'rxjs';

const localUrl = 'assets/data/staff-data.json';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  getStaffData(): Observable<HttpResponse<StaffList[]>> {
    return this.http.get<StaffList[]>(
      localUrl, { observe: 'response' });
  }
  constructor(private http: HttpClient) { }
}
