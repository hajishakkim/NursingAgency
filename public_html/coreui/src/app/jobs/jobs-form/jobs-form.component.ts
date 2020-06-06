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
  job = {};
  @Output() formData = new EventEmitter<Object>();
  @Input('list_items_data') list_items_data: any;
  constructor(builder: FormBuilder) {
    this.job = new Jobs();
    this.form = builder.group(this.job);
  }

  ngOnInit() {
    refreshSelectpicker();
  }
  saveForm(){
    this.formData.emit(this.job);
  }

  editForm(data:any){
    this.resetForm();
    data.action = 'edit';
    this.job = data;
    setTimeout( function(){
      refreshSelectpicker();
    },500);
  }

  resetForm(){
    this.job = {
      jobs_id :  '',
	  jobs_title: '',
      jobs_client :  '',
	  jobs_business_unit:'',
      action: '',
    };
  }
}
