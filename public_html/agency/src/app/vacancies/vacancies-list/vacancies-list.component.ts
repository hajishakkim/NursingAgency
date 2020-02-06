import { Component, OnInit, ViewChild } from '@angular/core';
import { VacanciesFormComponent } from '../vacancies-form/vacancies-form.component';
import { ApiService } from './api.service';
import { Vaccancies } from './vaccancies-list';
import { Observable, of } from 'rxjs';
import * as $ from 'jquery';
declare function setDataTable(options:any,table: string): void;
declare function fixedHeaderTable(ele:any): void;

@Component({
  selector: 'app-vacancies-list',
  templateUrl: './vacancies-list.component.html',
  styleUrls: ['./vacancies-list.component.css']
})
export class VacanciesListComponent implements OnInit {
  vacancy_data: Vaccancies[] = [];
  headers: string[];

  @ViewChild('app_vacancies_form', {static: false}) app_vacancies_form:VacanciesFormComponent;
  log: any;
  constructor(public api: ApiService) {}

  ngOnInit() {
      this.getVaccancyData();
      //setDataTable(null,'');
  }
  
  ngAfterContentInit(){    
    
  }
  getVaccancyData() {
    this.api.getVaccancyData()
    .subscribe(resp => {
      const keys = resp.headers.keys();
      this.headers = keys.map(key =>
        `${key}: ${resp.headers.get(key)}`);
  
      for (const data of resp.body) {
        //console.log(data)
        this.vacancy_data.push(data);
      }
      
      setTimeout( function(){ 
        fixedHeaderTable($('.listing-table-wrapper'));  
      },1000);
    });
    
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }
  
  saveForm(formData: Vaccancies) {
    this.vacancy_data.push(formData);    
  }
  formSubmit(){
    this.app_vacancies_form.saveForm();
  }
}
