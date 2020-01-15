import { Component, OnInit, ViewChild } from '@angular/core';
import { VacanciesFormComponent } from '../vacancies-form/vacancies-form.component';
declare function setDataTable(options:any,table: string): void;
@Component({
  selector: 'app-vacancies-list',
  templateUrl: './vacancies-list.component.html',
  styleUrls: ['./vacancies-list.component.css']
})
export class VacanciesListComponent implements OnInit {
  @ViewChild('app_vacancies_form', {static: false}) app_vacancies_form:VacanciesFormComponent;
  constructor() { }

  ngOnInit() {
    setDataTable(null,'');
  }
  ngAfterContentInit(){    
    
  }
  saveForm(formData:any) {
    console.log(formData);
  }
  formSubmit(){
    this.app_vacancies_form.saveForm();
  }
}
