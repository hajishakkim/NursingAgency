import { Component, OnInit, ViewChild } from '@angular/core';
import { VacanciesFormComponent } from '../vacancies-form/vacancies-form.component';
import { ApiService } from '../../services/api.service'
import {Vaccancies} from '../vaccancies.model';
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
  constructor(public API: ApiService) {}

  ngOnInit() {
      var data = [];
      this.getVaccanies({data:[]});
      //setDataTable(null,'');
  }
  
  ngAfterContentInit(){    
    //this.getVaccanies();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }
  saveForm(formData: Vaccancies) {
    this.API.post('vaccancies.php',{data:formData})
    .subscribe(data => {
      this.vacancy_data.push(formData);   
    });
  }
  getVaccanies(data:any) {
    this.API.post('vaccancies.php',data)
    .subscribe(data => {
      this.vacancy_data = data.data;
    });
  }
  // saveForm(formData: Vaccancies) {
  //   console.log(formData)
  //   //this.vacancy_data.push(formData);   
  //   this.API.post(formData,'http://localhost/nursingAgency/apis/index.php')
  //   .subscribe(resp => {
  //     const keys = resp.headers.keys();
  //     this.headers = keys.map(key =>
  //       `${key}: ${resp.headers.get(key)}`);
  
  //     for (const data of resp.body) {
  //       //console.log(data)
  //       this.vacancy_data.push(data);
  //     }
      
  //     setTimeout( function(){ 
  //       fixedHeaderTable($('.listing-table-wrapper'));  
  //     },1000);
  //   }); 
  // }
  formSubmit(){
    this.app_vacancies_form.saveForm();
  }
}
