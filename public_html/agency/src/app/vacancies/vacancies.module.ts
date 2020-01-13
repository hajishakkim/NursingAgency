import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacanciesListComponent } from './vacancies-list/vacancies-list.component';
import { VacanciesFormComponent } from './vacancies-form/vacancies-form.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [VacanciesListComponent, VacanciesFormComponent],
  imports: [
    CommonModule,
    FormsModule

  ]
})
export class VacanciesModule { }
