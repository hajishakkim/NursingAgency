import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
    candidate_id : ''
  };
  @Input('list_items_data') list_items_data: any;
  @Output() formData = new EventEmitter<Object>();
  constructor(builder: FormBuilder) {
    this.form = builder.group({
      candidate_id : '',
    candidate_fname: '',
      candidate_lname:'',
      candidate_title:'',
      candidate_gender:'',
      candidate_dob:'',
      candidate_address1:'',
      candidate_address2:'',
      candidate_address3 : '',
      candidate_country:'',
      candidate_postcode:'',
      candidate_designation:'',
      candidate_dbs_pvg_number:'',
      candidate_dbs_pvg_issue_date: '',
      candidate_staff_id:'',
      candidate_payroll_id:'',
      candidate_email:'',
      candidate_pin:'',
      candidate_pin_expiry_date:'',
      candidate_phone_country_code:'',
      candidate_phone_number : '',
      candidate_mobile_country_code:'',
      candidate_mobile_phone_number:'',
      candidate_employment_type:'',
      candidate_status:'',
      candidate_ni_number:'',
      candidate_passport_number: '',
      candidate_issueing_country:'',
      candidate_visit_type:''
    })
  }

  ngOnInit() {
    refreshSelectpicker();
  }
  saveForm(){
    this.formData.emit(this.candidate);
  }
  editItem(item:any){
    item.action = "edit";
    this.candidate = item;
    setTimeout( function(){ 
      refreshSelectpicker(); 
    },500);
  }
  resetForm(){
    this.candidate =  {
      candidate_id : ''

  };
   // this.form.reset();
    setTimeout( function(){ 
      refreshSelectpicker(); 
    },500);
  }

}
