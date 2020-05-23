import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service'
import { Candidates } from '../candidates.model';
import * as $ from 'jquery';
declare function refreshSelectpicker(): void;
@Component({
  selector: 'app-candidates-form',
  templateUrl: './candidates-form.component.html',
  styleUrls: ['./candidates-form.component.css']
})
export class CandidatesFormComponent implements OnInit {
  form: FormGroup;
  candidate = {};
  @Input('list_items_data') list_items_data: any;
  @Output() formData = new EventEmitter<Object>();
  constructor(builder: FormBuilder) {
	this.candidate = new Candidates();
    this.form = builder.group(this.candidate)
  }

  ngOnInit() {
    refreshSelectpicker();
  }
  saveForm(){
	  this.formData.emit(this.candidate);
  }
  editItem(item:any){
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
