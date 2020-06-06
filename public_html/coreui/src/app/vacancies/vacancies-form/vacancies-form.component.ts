import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder } from '@angular/forms';
import {Vaccancies} from '../vaccancies.model';
import * as $ from 'jquery';
declare function refreshSelectpicker(): void;
declare function initValidation(form:any): boolean;
declare function checkValidation(form:any): boolean;
@Component({
  selector: 'app-vacancies-form',
  templateUrl: './vacancies-form.component.html',
  styleUrls: ['./vacancies-form.component.css']
})
export class VacanciesFormComponent implements OnInit {
  form: FormGroup;  
  vaccancy : {};
  @Output() formData = new EventEmitter<Object>();
  @Input('list_items_data') list_items_data: any;
  @Input('form_state') form_state: any;  
  constructor(builder: FormBuilder) {
    this.vaccancy = new Vaccancies();
    this.form = builder.group(this.vaccancy)
  }

  ngOnInit() {
    refreshSelectpicker();
    initValidation('#vaccancy-form');
  }
  saveForm(){        
    if(checkValidation('#vaccancy-form')){
      this.formData.emit(this.vaccancy);
      return true;
    }else{
      
    }
    return false;
    
  }
  editItem(item:any){
    this.vaccancy = item;
  }
	clearForm(){
	this.form.reset();
	refreshSelectpicker();
  }
}
