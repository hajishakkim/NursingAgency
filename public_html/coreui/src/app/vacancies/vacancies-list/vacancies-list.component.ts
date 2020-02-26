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
  formData : {};
  @ViewChild('app_vacancies_form', {static: false}) app_vacancies_form:VacanciesFormComponent;
  log: any;
  constructor(public API: ApiService) {}

  ngOnInit() {
      var data = [];
      this.getVaccanies({data:[]});
      //setDataTable(null,'');
  }
  
  ngAfterContentInit(){  
  }  
  saveForm(formData: Vaccancies) {
    this.API.post('vaccancies.php',{data:formData})
    .subscribe(data => {
      if(data.status == "success") {
        this.vacancy_data.push(formData);   
      }else{

      }
    });
  }
  getVaccanies(data:any) {
    this.API.post('vaccancies.php',data)
    .subscribe(data => {
      this.vacancy_data = data.data;
    });
  }
  formSubmit(){
    this.app_vacancies_form.saveForm();
  }
  editItem(item:any){    
    this.app_vacancies_form.editItem(item);
  }
}
