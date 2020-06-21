import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder } from '@angular/forms';
import * as $ from 'jquery';
declare function refreshSelectpicker(): void;
@Component({
  selector: 'app-candidates-form',
  templateUrl: './candidates-form.component.html',
  styleUrls: ['./candidates-form.component.css']
})
export class CandidatesFormComponent implements OnInit {
  form: FormGroup;
  candidate = {
    first_name: '',
    middle_name:'',
    sur_name:'',
    gender:'',
    dob:'',
    address1:'',
    address2:'',
    address3 : '',
    country:'',
    postcode:'',
    designation:'',
    dbs_pvg_number:'',
    dbs_pvg_issue_date: '',
    staff_id:'',
    payroll_id:'',
    email:'',
    pin:'',
    pin_expire_date:'',
    phone_country_code:'',
    phone : '',
    mobile_country_code:'',
    mobile:'',
    employment_type:'',
    status:'',
    ni_number:'',
    passport_number: '',
    issuing_country:'',
    visa_type:''

  };
  @Output() formData = new EventEmitter<Object>();
  constructor(builder: FormBuilder) {
    this.form = builder.group({
      first_name: '',
      middle_name:'',
      sur_name:'',
      gender:'',
      dob:'',
      address1:'',
      address2:'',
      address3 : '',
      country:'',
      postcode:'',
      designation:'',
      dbs_pvg_number:'',
      dbs_pvg_issue_date: '',
      staff_id:'',
      payroll_id:'',
      email:'',
      pin:'',
      pin_expire_date:'',
      phone_country_code:'',
      phone : '',
      mobile_country_code:'',
      mobile:'',
      employment_type:'',
      status:'',
      ni_number:'',
      passport_number: '',
      issuing_country:'',
      visa_type:''
    })
  }

  ngOnInit() {
    refreshSelectpicker();
  }
  saveForm(){
    console.log(this.candidate);
    //this.formData.emit(this.candidate);
  }

}
