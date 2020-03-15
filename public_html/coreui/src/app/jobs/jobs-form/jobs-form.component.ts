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
  constructor(builder: FormBuilder) {
    this.job = new Jobs();
    this.form = builder.group(this.job)
  }

  ngOnInit() {
    refreshSelectpicker();
  }
  saveForm(){
    console.log(12345);
    this.formData.emit(this.job);
  }

  editForm(data:any){
    this.resetForm();
    data.action = 'edit';
    this.job = data;
    setTimeout( function(){
      refreshSelectpicker();
    },1000);
  }

  resetForm(){
    this.job = {
      id :  '',
      category :  '',
      job_role :  '',
      action: '',
    };
  }
}
