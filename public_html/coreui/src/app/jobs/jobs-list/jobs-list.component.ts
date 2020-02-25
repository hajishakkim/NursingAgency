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

  @ViewChild('app_jobs_form', {static: false}) app_jobs_form:JobsFormComponent;
  log: any;
  constructor(public API: ApiService) {}

  ngOnInit() {
      var data = [];
      this.getJobs({data:[]});
      this.clients_list = [
        {job_client_id: 1, name:'Superman'},
        {job_client_id: 2, name:'Batman'},
        {job_client_id: 5, name:'BatGirl'},
        {job_client_id: 3, name:'Robin'},
        {job_client_id: 4, name:'Flash'}
    ];
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
  getJobs(data:any) {
    this.API.post('jobs.php',data)
    .subscribe(data => {
      this.jobs_data = data.data;
    });
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
  
}
