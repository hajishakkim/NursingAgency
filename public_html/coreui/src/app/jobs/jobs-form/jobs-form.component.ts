import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder } from '@angular/forms';
import {Jobs} from '../jobs.model';
import * as $ from 'jquery';
declare function refreshSelectpicker(): void;
@Component({
  selector: 'app-jobs-form',
  templateUrl: './jobs-form.component.html',
  styleUrls: ['./jobs-form.component.css']
})
export class JobsFormComponent implements OnInit {
  form: FormGroup;  
  jobs : {};
  
  @Input('clients_list') clients_list; 
  @Input('job_business_unit_list') job_business_unit_list;
  @Output() formData = new EventEmitter<Object>();
  constructor(builder: FormBuilder) {
    this.jobs = new Jobs();
    console.log(this.clients_list);
    this.form = builder.group(this.jobs)
  }

  ngOnInit() {
    refreshSelectpicker();
  }
  saveForm(){
    this.formData.emit(this.jobs);
  }
  editForm(data:any){
    data.action = "edit";
    this.jobs = data;
    this.saveForm();
    setTimeout( function(){ 
      refreshSelectpicker(); 
    },500);
  }
  deleteRow(data:any){
    data.action = "delete";
    this.jobs = data; 
    this.saveForm();
  }
  resetForm(){
    this.jobs = {};
   // this.form.reset();
    setTimeout( function(){ 
      refreshSelectpicker(); 
    },500);
  }
}
