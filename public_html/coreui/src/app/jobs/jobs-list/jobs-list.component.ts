import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { JobsFormComponent } from '../jobs-form/jobs-form.component';
import { ApiService } from '../../services/api.service'
import {Jobs} from '../jobs.model';
import { Observable, of } from 'rxjs';
import * as $ from 'jquery';

declare function setDataTable(options:any,table: string): void;
declare function fixedHeaderTable(ele:any): void;
declare function refreshSelectpicker(): void;

declare function setDataTable(options:any,table: string): void;
declare function fixedHeaderTable(ele:any): void;
@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {

  jobs_data: Jobs[] = [];
  headers: string[];
  row_count   : 0;
  row_per_page : number;
  page : number;
  formData : {};
  totalPages :number;
  id:number;
  totalPagesArr : [];

  @ViewChild('app_jobs_form', {static: false}) app_jobs_form:JobsFormComponent;
  @ViewChild('getModal') getModal: ElementRef<HTMLElement>;  
  @ViewChild('getModalDelete') getModalDelete: ElementRef<HTMLElement>; 

  log: any;
  advanced_filter_search : boolean = false;
  params: {};
  list_items_data : [];
  constructor(public API: ApiService) {}

  ngOnInit() {
    var data = [];
    this.getJobs({data:[]},1,10);
    this.getListItems();
  }

  saveForm(formData: Jobs) {
    console.log(formData);
    this.API.post('jobs.php',{data:formData})
    .subscribe(data => {
      if(data.status == "success") {
        this.getJobs({data:[]},this.page,this.row_per_page);  
      }else{

      }
    }); 
  }
  
  getJobs(data:any,page_no=0,row_per_page=0) {
    data.page = page_no;
    data.row_per_page = row_per_page;
    data.totalPagesArr = [];
    this.API.post('jobs.php',data)
    .subscribe(data => {
      this.jobs_data = data.data;
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
    this.getJobs({data:[]},this.page,this.row_per_page);
   }
 
 
  editJob(data:any) {
    let el: HTMLElement = this.getModal.nativeElement;
    el.click();
    this.app_jobs_form.editForm(data);
  }
 
  deleteJob(id:any){
    this.id = id;
    let el: HTMLElement = this.getModalDelete.nativeElement;
    el.click();
  }

  confirmDelete(){
    this.params = {'id':this.id,'action':'delete'};
    this.deleteJobData(this.params);
  }

  deleteJobData(params: any) {
    this.API.post('jobs.php',{data:params})
    .subscribe(data => {
      if(data.status == "success") {
        this.getJobs({data:[]},this.page,this.row_per_page);  
      }
    }); 
  }

  showAdvancedSearch(){
    alert(1);
    this.advanced_filter_search = (this.advanced_filter_search) ? false: true;
    setTimeout(function(){
      refreshSelectpicker();
    },1000)

  }

  getListItems(){
    var data = {
      'request_items': {
        'list_items': ['shift_type'],
        'modules': ['client','business_unit','jobs'],
      }
    };
    this.API.post('jobs.php',data)
    .subscribe(data => {
      this.list_items_data = data;
      setTimeout(function(){
        refreshSelectpicker();
      },1000)
    });
  }
  
  formSubmit(){
    this.app_jobs_form.saveForm();
  }

  cancelSave(){
    this.getJobs({data:[]},this.page,this.row_per_page);
  }
  
}
  