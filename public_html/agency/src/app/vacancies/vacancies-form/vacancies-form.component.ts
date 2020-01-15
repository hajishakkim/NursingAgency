import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder } from '@angular/forms';
//import {VaccancyModel} from '../vaccancies.model';
@Component({
  selector: 'app-vacancies-form',
  templateUrl: './vacancies-form.component.html',
  styleUrls: ['./vacancies-form.component.css']
})
export class VacanciesFormComponent implements OnInit {
  form: FormGroup;  
  vaccancy = {
    vaccancy_ref_number: '',
    vaccancy_date:'',
    vaccancy_cilent:'',
    vaccancy_business:'',
    vaccancy_staff_shift:'',
    vaccancy_job:'',
    vaccancy_break_time:'',
    vaccancy_space : '',
    vaccancy_location:'',
    vaccancy_details:'',

  };
  @Output() formData = new EventEmitter<Object>();
  constructor(builder: FormBuilder) {
    this.form = builder.group({
      vaccancy_ref_number: '',
      vaccancy_date:'',
      vaccancy_cilent:'',
      vaccancy_business:'',
      vaccancy_staff_shift:'',
      vaccancy_job:'',
      vaccancy_break_time:'',
      vaccancy_space : '',
      vaccancy_location:'',
      vaccancy_details:'',
    })
  }

  ngOnInit() {
  }
  saveForm(){
    this.formData.emit(this.vaccancy);
  }

}
