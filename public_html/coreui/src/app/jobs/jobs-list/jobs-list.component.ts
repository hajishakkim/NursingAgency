import { Component, OnInit, ViewChild } from '@angular/core';
import { JobsFormComponent } from '../jobs-form/jobs-form.component';
import { ApiService } from '../../services/api.service'
import {Jobs} from '../jobs.model';
import { Observable, of } from 'rxjs';
import * as $ from 'jquery';

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
  clients_list :{};
  job_business_unit_list : {};

  @ViewChild('app_jobs_form', {static: false}) app_jobs_form:JobsFormComponent;
  log: any;
  row_count: any;
  page: number;
  row_per_page: number;
  totalPagesArr: any;
  constructor(public API: ApiService) {}

  ngOnInit() {
      var data = [];
      this.getJobs({data:[]},1,10);
      this.clients_list = [
        {job_client_id: 1, name:'Superman'},
        {job_client_id: 2, name:'Batman'},
        {job_client_id: 5, name:'BatGirl'},
        {job_client_id: 3, name:'Robin'},
        {job_client_id: 4, name:'Flash'}
    ];
    this.job_business_unit_list = [ 
      {id: 1, name:'KKG1'},
      {id: 2, name:'KKG2'},
      {id: 5, name:'CCG'},
      {id: 3, name:'GRG'},
      {id: 4, name:'TGC'}];
      //setDataTable(null,'');
  }
  
  ngAfterContentInit(){  
  }  
  saveForm(formData: Jobs) {
    console.log(Jobs)
    this.API.post('jobs.php',{data:formData})
    .subscribe(data => {
      if(data.status == "success") {
        this.jobs_data.push(formData);   
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
  }
  getCurrentPage(rows: 0,from=''){
    if(from=="page" && (rows <0 || rows > (this.row_count%this.row_per_page > 0 ? (this.row_count/this.row_per_page)+1 : (this.row_count/this.row_per_page) ))){
      alert("INVALID PAGE")
      return false;
    }
    this.page = from == "rpp" ? 1 : rows;
    this.row_per_page = from == "rpp" ?  rows : this.row_per_page;
    this.getJobs({data:[]},this.page,this.row_per_page);
   } 

  /*ngOnInit() {
    setTimeout( function(){ 
      fixedHeaderTable($('.listing-table-wrapper'));  
    },1000);
  }*/
  formSubmit(){
    this.app_jobs_form.saveForm();
  }
  editForm(id:any){
    this.app_jobs_form.editForm(id);
  }
  deleteRow(id:any){
    this.app_jobs_form.deleteRow(id);
  }  
  resetForm(){
    this.app_jobs_form.resetForm();  
  }
  
}
  