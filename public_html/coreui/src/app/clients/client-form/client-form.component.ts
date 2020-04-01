import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder } from '@angular/forms';
//import { Client } from '../client-list/client-list';
import * as $ from 'jquery';
declare function refreshSelectpicker(): void;
@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  form: FormGroup;
  client = {
    id : '',
    agency:  '',
    authorized_person: '',
    email: '',
    address1: '',
    address2: '',
    post_code: '',
    phone: '',
    mobile :  '',
    action: '',

  };
  @Output() formData = new EventEmitter<Object>();
  constructor(builder: FormBuilder) {
    this.form = builder.group({
      id : '',
      agency:  '',
      authorized_person: '',
      email: '',
      address1: '',
      address2: '',
      post_code: '',
      phone: '',
      mobile :  '',
      action: '',
    })
  }

  ngOnInit() {
    refreshSelectpicker();
    this.resetForm();
  }
  saveForm(){
    this.formData.emit(this.client);
  }

  editForm(data:any){
    this.resetForm();
    this.client = data;
    this.client.action = 'edit';
  }

  resetForm(){
    this.client = {
      id : '',
      agency:  '',
      authorized_person: '',
      email: '',
      address1: '',
      address2: '',
      post_code: '',
      phone: '',
      mobile :  '',
      action: '',
    };
  }

}
