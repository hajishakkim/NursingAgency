import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder } from '@angular/forms';
import { Client } from '../client.model';
import * as $ from 'jquery';
declare function refreshSelectpicker(): void;
@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  form: FormGroup;
  client = {};
  @Output() formData = new EventEmitter<Object>();
  constructor(builder: FormBuilder) {
	this.client = new Client();
    this.form = builder.group(this.client);
  }

  ngOnInit() {
    refreshSelectpicker();
  }
  saveForm(){
    this.formData.emit(this.client);
  }

  editForm(data:any){
    this.resetForm();
	data.action = 'edit';
    this.client = data;
  }
resetForm(){
    this.form.reset();
	refreshSelectpicker();
  }

}
