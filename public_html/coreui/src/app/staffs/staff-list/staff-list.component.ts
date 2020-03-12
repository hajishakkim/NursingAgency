import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { StaffList } from './staff-list';
import { Observable, of } from 'rxjs';
import * as $ from 'jquery';
declare function setDataTable(options:any,table: string): void;
declare function fixedHeaderTable(ele:any): void;
@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {

  staff_data: StaffList[] = [];
  headers: string[];
  row_count   : 0;
  row_per_page : number;
  page : number;
  formData : {};
  totalPages :number;
  id:number;
  totalPagesArr : [];

  constructor(public API: ApiService) {}

  ngOnInit() {
    var data = [];
    this.getStaffData({data:[]},1,10);
    
  }

  saveForm(formData: StaffList) {
    this.API.post('staff.php',{data:formData})
    .subscribe(data => {
      if(data.status == "success") {
        this.getStaffData({data:[]},this.page,this.row_per_page);  
      }else{

      }
    }); 
  }

  //formSubmit(){
    //this.app_client_rate_form.saveForm();
  //}
  getStaffData(data:any,page_no=0,row_per_page=0) {
    data.page = page_no;
    data.row_per_page = row_per_page;
    data.totalPagesArr = [];
    this.API.post('staff.php',data)
    .subscribe(data => {
      this.staff_data = data.data;
      this.row_count = data.totalCnt;
      this.page = page_no;
      this.row_per_page  = row_per_page;
      this.totalPagesArr = data.totalPagesArr; 
    });
    setTimeout( function(){
      fixedHeaderTable($('.listing-table-wrapper'));
    },1000);
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
