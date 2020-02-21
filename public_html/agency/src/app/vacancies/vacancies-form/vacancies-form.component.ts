import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder } from '@angular/forms';
import {Vaccancies} from '../vaccancies.model';
import * as $ from 'jquery';
declare function refreshSelectpicker(): void;
@Component({
  selector: 'app-vacancies-form',
  templateUrl: './vacancies-form.component.html',
  styleUrls: ['./vacancies-form.component.css']
})
export class VacanciesFormComponent implements OnInit {
  form: FormGroup;  
  vaccancy : {};
  @Output() formData = new EventEmitter<Object>();
  constructor(builder: FormBuilder) {
    this.vaccancy = new Vaccancies();
    //console.log(this.vaccancy);
    this.form = builder.group(this.vaccancy)
  }

  ngOnInit() {
    refreshSelectpicker();
  }
  saveForm(){
    this.formData.emit(this.vaccancy);
  }
  editItem(item:any){
    console.log(item);
    this.vaccancy = JSON.parse(item);
  }
}
