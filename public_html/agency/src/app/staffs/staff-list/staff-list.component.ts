import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { StaffList } from './staff-list';
import { Observable, of } from 'rxjs';
import * as $ from 'jquery';
declare function setDataTable(options:any,table: string): void;
@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {

  staff_data: StaffList[] = [];
  headers: string[];
  constructor(public api: ApiService) {}

  ngOnInit() {
    this.getStaffData();
  }
  getStaffData() {
    this.api.getStaffData()
    .subscribe(resp => {
      const keys = resp.headers.keys();
      this.headers = keys.map(key =>
        `${key}: ${resp.headers.get(key)}`);
  
      for (const data of resp.body) {
        this.staff_data.push(data);
      }
      setTimeout( function(){
        setDataTable(null,'');
      },100);
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }
  private log(message: string) {
    console.log(message);
  }
}
