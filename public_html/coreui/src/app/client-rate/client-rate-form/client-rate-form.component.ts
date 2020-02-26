import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder } from '@angular/forms';
import * as $ from 'jquery';
declare function refreshSelectpicker(): void;
@Component({
  selector: 'app-client-rate-form',
  templateUrl: './client-rate-form.component.html',
  styleUrls: ['./client-rate-form.component.css']
})
export class ClientRateFormComponent implements OnInit {
  form: FormGroup;
  clientRate = {
    client: '',
    business_unit:'',
    job:'',
    week_days:'',
    night_time:'',
    friday_night:'',
    saturday_day:'',
    saturday_night : '',
    sunday_day:'',
    sunday_night:'',
    public_hodliday_day:'',
    public_hodliday_night:'',

  };
  @Output() formData = new EventEmitter<Object>();
  constructor(builder: FormBuilder) {
    this.form = builder.group({
      client: '',
      business_unit:'',
      job:'',
      week_days:'',
      night_time:'',
      friday_night:'',
      saturday_day:'',
      saturday_night : '',
      sunday_day:'',
      sunday_night:'',
      public_hodliday_day:'',
      public_hodliday_night:'',
    })
  }

  ngOnInit() {
    refreshSelectpicker();
  }
  saveForm(){
    this.formData.emit(this.clientRate);
  }

}
