import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';
import {FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service'
import { ClientRate } from '../client-rate.model';
import * as $ from 'jquery';
declare function refreshSelectpicker(): void;
@Component({
  selector: 'app-client-rate-form',
  templateUrl: './client-rate-form.component.html',
  styleUrls: ['./client-rate-form.component.css']
})
export class ClientRateFormComponent implements OnInit {
  form: FormGroup;
  ClientRate = {};
  @Output() formData = new EventEmitter<Object>();
  @Input('list_items_data') list_items_data: any;
  constructor(builder: FormBuilder) {
	this.ClientRate = new ClientRate();
    this.form = builder.group(this.ClientRate);
  }

  ngOnInit() {
    refreshSelectpicker();
  }
  saveForm(){
    this.formData.emit(this.ClientRate);
  }
  
  editForm(data:any){
    this.resetForm();
	data.action = 'edit';
    this.ClientRate = data;
   // this.ClientRate.action = 'edit';
  }

  resetForm(){
    this.form.reset();
	refreshSelectpicker();
  }

}
