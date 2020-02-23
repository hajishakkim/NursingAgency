import { NgModule,Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser'
import {ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms'
import { VacanciesListComponent } from './vacancies-list/vacancies-list.component';
import { VacanciesFormComponent } from './vacancies-form/vacancies-form.component';
import { VacancyRoutingModule } from '../vacancies/vacancies-rounting.module';



@NgModule({
  declarations: [VacanciesListComponent, VacanciesFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VacancyRoutingModule
  ]
})
export class VacanciesModule { }
