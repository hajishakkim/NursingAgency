import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder } from '@angular/forms';
import { JobRole } from '../job-role-model';
import * as $ from 'jquery';

declare function refreshSelectpicker(): void;
@Component({
  selector: 'app-job-roles-form',
  templateUrl: './job-roles-form.component.html',
  styleUrls: ['./job-roles-form.component.css']
})
export class JobRolesFormComponent implements OnInit {
  form: FormGroup;
  JobRoles = {};
  @Output() formData = new EventEmitter<Object>();
  constructor(builder: FormBuilder) {
    this.JobRoles = new JobRole();
    this.form = builder.group(this.JobRoles)
  }

  ngOnInit() {
    refreshSelectpicker();
  }
  saveForm(){
    console.log(12345);
    this.formData.emit(this.JobRoles);
  }

  editForm(data:any){
    this.resetForm();
    data.action = 'edit';
    this.JobRoles = data;
  }

  resetForm(){
    this.JobRoles = {
      id :  '',
      category :  '',
      job_role :  '',
      action: '',
    };
  }

}
