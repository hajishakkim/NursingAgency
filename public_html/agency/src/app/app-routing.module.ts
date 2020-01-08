import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VacanciesListComponent } from './vacancies/vacancies-list/vacancies-list.component';
import { StaffListComponent } from './staffs/staff-list/staff-list.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { JobRolesListComponent } from './job-roles/job-roles-list/job-roles-list.component';
import { JobsListComponent } from './jobs/jobs-list/jobs-list.component';
import { ClientRateListComponent } from './client-rate/client-rate-list/client-rate-list.component';
import { StaffRateListComponent } from './staff-rate/staff-rate-list/staff-rate-list.component';
import { DocumentTypeListComponent } from './document-type/document-type-list/document-type-list.component';
import { HolidaysListComponent } from './holidays/holidays-list/holidays-list.component';

const routes: Routes = [
  { path: 'staff', component: StaffListComponent },
  { path: 'vaccancies', component: VacanciesListComponent },
  { path: 'client', component: ClientListComponent },
  { path: 'job-roles', component: JobRolesListComponent },
  { path: 'jobs', component: JobsListComponent },
  { path: 'client-rate', component: ClientRateListComponent },
  { path: 'staff-rate', component: StaffRateListComponent },
  { path: 'document-type', component: DocumentTypeListComponent },
  { path: 'holidays', component: HolidaysListComponent },
  { path: '',   redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
