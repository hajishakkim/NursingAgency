import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StaffRateFormComponent} from '../staff-rate-form/staff-rate-form.component';
import { ApiService } from '../../services/api.service'
import { StaffRate } from './staff-rate-list';
import * as $ from 'jquery';

declare function setDataTable(options:any,table: string): void;
declare function fixedHeaderTable(ele:any): void;

@Component({
  selector: 'app-staff-rate-list',
  templateUrl: './staff-rate-list.component.html',
  styleUrls: ['./staff-rate-list.component.css']
})
export class StaffRateListComponent implements OnInit {
  staff_rate_data: StaffRate[] = [];
  headers: string[];
  row_count   : 0;
  row_per_page : number;
  page : number;
  formData : {};
  totalPages :number;
  totalPagesArr : [];
  id:number;

  @ViewChild('app_staff_rate_form', {static: false}) app_staff_rate_form:StaffRateFormComponent;
  @ViewChild('getModal') getModal: ElementRef<HTMLElement>;  
  @ViewChild('getModalDelete') getModalDelete: ElementRef<HTMLElement>;  
  log: any;
  params: {};
  constructor(public API: ApiService) {}

  ngOnInit() {
    var data = [];
    this.getStaffRate({data:[]},1,10);
  }

  saveForm(formData: StaffRate) {
    console.log(formData);
    this.API.post('staff-rate.php',{data:formData})
    .subscribe(data => {
      if(data.status == "success") {
        this.getStaffRate({data:[]},this.page,this.row_per_page);  
      }else{

      }
    }); 
  }

  formSubmit(){
    this.app_staff_rate_form.saveForm();
  }

  getStaffRate(data:any,page_no=0,row_per_page=0) {
    data.page = page_no;
    data.row_per_page = row_per_page;
    data.totalPagesArr = [];
    this.API.post('staff-rate.php',data)
    .subscribe(data => {
      this.staff_rate_data = data.data;
      this.row_count = data.totalCnt;
      this.page = page_no;
      this.row_per_page  = row_per_page;
      this.totalPagesArr = data.totalPagesArr; 
    });
    setTimeout( function(){
      fixedHeaderTable($('.listing-table-wrapper'));
    },1000);
  }
  
  getCurrentPage(rows: 0,from=''){
    this.page = from == "rpp" ? 1 : rows;
    this.row_per_page = from == "rpp" ?  rows : this.row_per_page;
    this.getStaffRate({data:[]},this.page,this.row_per_page);
  } 

  editStaffRate(data:any) {
    console.log(data);
    let el: HTMLElement = this.getModal.nativeElement;
    el.click();
    this.app_staff_rate_form.editForm(data);
  }
  
  deleteStaffRate(id:any){
    this.id = id;
    let el: HTMLElement = this.getModalDelete.nativeElement;
    el.click();
  }

  confirmDelete(){
    this.params = {'id':this.id,'action':'delete'};
    this.deleteStaffRateData(this.params);
  }

  deleteStaffRateData(params: any) {
    this.API.post('staff-rate.php',{data:params})
    .subscribe(data => {
      if(data.status == "success") {
        this.getStaffRate({data:[]},this.page,this.row_per_page);  
      }
    }); 
  }

}
