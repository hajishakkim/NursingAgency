import { Component, OnInit, Output,Input, EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service'
import { StaffRate } from '../staff-rate.model';
import * as $ from 'jquery';
declare function refreshSelectpicker(): void;
@Component({
  selector: 'app-staff-rate-form',
  templateUrl: './staff-rate-form.component.html',
  styleUrls: ['./staff-rate-form.component.css']
})
export class StaffRateFormComponent implements OnInit {
  form: FormGroup;
  staffRate = {};
  @Output() formData = new EventEmitter<Object>();
  @Input('list_items_data') list_items_data: any;
 constructor(builder: FormBuilder) {
    this.staffRate = new StaffRate();
    this.form = builder.group(this.staffRate)
  }
  ngOnInit() {
    refreshSelectpicker();
  }
  saveForm(){
    this.formData.emit(this.staffRate);
  }

  editForm(data:any){
    this.resetForm();
	data.action = 'edit';
    this.staffRate = data;
  }
  clearForm(){
	this.form.reset();
	refreshSelectpicker();
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
