import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VacanciesListComponent } from './vacancies-list/vacancies-list.component';

const routes: Routes = [
  { path: '', component: VacanciesListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacancyRoutingModule { }
