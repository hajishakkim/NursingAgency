import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import {FormGroup, FormBuilder, Validators,NgForm } from '@angular/forms';
import * as $ from 'jquery';
declare function refreshSelectpicker(): void;
@Component({
  selector: 'app-candidates-form',
  templateUrl: './candidates-form.component.html',
  styleUrls: ['./candidates-form.component.css']
})


export class CandidatesFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;
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

  constructor(private  builder: FormBuilder) {
    
  }

  ngOnInit() {
    this.form = this.builder.group({
      first_name: ['', Validators.required],
      middle_name:['', Validators.required],
      sur_name:['', Validators.required],
      gender:['', Validators.required],
      dob:['', Validators.required],
      address1:['', Validators.required],
      address2:['', Validators.required],
      address3 : ['', Validators.required],
      country:['', Validators.required],
      postcode:['', Validators.required],
      designation:['', Validators.required],
      dbs_pvg_number:['', Validators.required],
      dbs_pvg_issue_date:['', Validators.required],
      staff_id:['', Validators.required],
      payroll_id:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      pin:['', Validators.required],
      pin_expire_date:['', Validators.required],
      phone_country_code:['', Validators.required],
      phone : ['', Validators.required],
      mobile_country_code:['', Validators.required],
      mobile:['', Validators.required],
      employment_type:['', Validators.required],
      status:['', Validators.required],
      ni_number:['', Validators.required],
      passport_number: ['', Validators.required],
      issuing_country:['', Validators.required],
      visa_type:['', Validators.required]
    })
    refreshSelectpicker();
  }
  
  saveForm(){
    refreshSelectpicker();
    if (this.form.invalid) {
      this.submitted = true;
    }else{
      this.formData.emit(this.candidate);
    }
  }

}
