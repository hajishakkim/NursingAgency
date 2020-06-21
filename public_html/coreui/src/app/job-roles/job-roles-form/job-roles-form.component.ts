import { Component, OnInit, Output, Input,EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service'
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
  @Input('list_items_data') list_items_data: any;
  constructor(builder: FormBuilder) {
    this.JobRoles = new JobRole();
    this.form = builder.group(this.JobRoles)
  }

  ngOnInit() {
    refreshSelectpicker();
  }
  saveForm(){
    this.formData.emit(this.JobRoles);
  }

  editForm(data:any){
    this.resetForm();
    data.action = 'edit';
    this.JobRoles = data;
  }

  resetForm(){
    this.JobRoles = {
      job_role_id :  '',
      job_role_category :  '',
      job_role_job_role :  '',
      action: '',
    };
  }

}
