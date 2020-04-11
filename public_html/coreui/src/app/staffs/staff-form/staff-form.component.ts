import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service'
import { StaffList } from '../staffs.model';
import * as $ from 'jquery';
declare function refreshSelectpicker(): void;
@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.css']
})
export class StaffFormComponent implements OnInit {
  form: FormGroup;
  stafflist = {};
  @Input('list_items_data') list_items_data: any;
  @Output() formData = new EventEmitter<Object>();
  constructor(builder: FormBuilder) {
	this.stafflist = new StaffList();
    this.form = builder.group(this.stafflist)
  }

  ngOnInit() {
    refreshSelectpicker();
  }
  saveForm(){
	  
    this.formData.emit(this.stafflist);
  }
  editItem(item:any){
	  item.action = "edit";
    this.stafflist = item;
    setTimeout( function(){ 
      refreshSelectpicker(); 
    },500);
  }
  resetForm(){
	  this.form.reset();
    setTimeout( function(){ 
      refreshSelectpicker(); 
    },500);
  }

}
