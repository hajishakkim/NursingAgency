import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder } from '@angular/forms';
import * as $ from 'jquery';
declare function refreshSelectpicker(): void;
@Component({
  selector: 'app-staff-rate-form',
  templateUrl: './staff-rate-form.component.html',
  styleUrls: ['./staff-rate-form.component.css']
})
export class StaffRateFormComponent implements OnInit {
  form: FormGroup;
  staffRate = {
    id:'',
    client: '',
    business_unit:'',
    job:'',
    employee_type:'',
    week_days:'',
    night_time:'',
    friday_night:'',
    saturday_day:'',
    saturday_night : '',
    sunday_day:'',
    sunday_night:'',
    public_hodliday_day:'',
    public_hodliday_night:'',
    action:'',

  };
  @Output() formData = new EventEmitter<Object>();
  constructor(builder: FormBuilder) {
    this.form = builder.group({
      id:'',
      client: '',
      business_unit:'',
      job:'',
      employee_type:'',
      week_days:'',
      night_time:'',
      friday_night:'',
      saturday_day:'',
      saturday_night : '',
      sunday_day:'',
      sunday_night:'',
      public_hodliday_day:'',
      public_hodliday_night:'',
      action:'',
    })
  }

  ngOnInit() {
    refreshSelectpicker();
  }
  saveForm(){
    this.formData.emit(this.staffRate);
  }

  editForm(data:any){
    this.resetForm();
    this.staffRate = data;
    this.staffRate.action = 'edit';
  }

  resetForm(){
    this.staffRate = {
      id:'',
      client: '',
      business_unit:'',
      job:'',
      employee_type:'',
      week_days:'',
      night_time:'',
      friday_night:'',
      saturday_day:'',
      saturday_night : '',
      sunday_day:'',
      sunday_night:'',
      public_hodliday_day:'',
      public_hodliday_night:'',
      action:'',
    };
  }

}
