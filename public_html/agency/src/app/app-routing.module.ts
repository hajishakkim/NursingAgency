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
import { CandidatesListComponent } from './candidates/candidates-list/candidates-list.component';
import { TimeSheetsListComponent } from './time-sheets/time-sheets-list/time-sheets-list.component';
import { HistoryListComponent } from './history/history-list/history-list.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { ReportsListComponent } from './reports/reports-list/reports-list.component';
import { BookingsListComponent } from './bookings/bookings-list/bookings-list.component';

const routes: Routes = [
  { path: 'staff', component: StaffListComponent },
  { path: 'vacancies', component: VacanciesListComponent },
  { path: 'client', component: ClientListComponent },
  { path: 'job-roles', component: JobRolesListComponent },
  { path: 'jobs', component: JobsListComponent },
  { path: 'client-rate', component: ClientRateListComponent },
  { path: 'staff-rate', component: StaffRateListComponent },
  { path: 'document-type', component: DocumentTypeListComponent },
  { path: 'holidays', component: HolidaysListComponent },
  { path: 'candidates', component: CandidatesListComponent },
  { path: 'time-sheets', component: TimeSheetsListComponent },
  { path: 'bookings', component: BookingsListComponent },
  { path: 'history', component: HistoryListComponent },
  { path: 'invoice', component: InvoiceListComponent },
  { path: 'reports', component: ReportsListComponent },
  //{ path: '',   redirectTo: '', pathMatch: 'full' },
  { path: '',   component: VacanciesListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
