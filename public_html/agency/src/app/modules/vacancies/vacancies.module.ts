import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacanciesListComponent } from './vacancies-list/vacancies-list.component';
import { VacanciesFormComponent } from './vacancies-form/vacancies-form.component';



@NgModule({
  declarations: [VacanciesListComponent, VacanciesFormComponent],
  imports: [
    CommonModule
  ]
})
export class VacanciesModule { }
