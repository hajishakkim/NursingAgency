import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VacanciesListComponent } from './modules/vacancies/vacancies-list/vacancies-list.component';
import { StaffListComponent } from './modules/staffs/staff-list/staff-list.component';
import { ClientListComponent } from './modules/clients/client-list/client-list.component';
import { JobRolesListComponent } from './modules/job-roles/job-roles-list/job-roles-list.component';
import { JobsListComponent } from './modules/jobs/jobs-list/jobs-list.component';
import { ClientRateListComponent } from './modules/client-rate/client-rate-list/client-rate-list.component';
import { StaffRateListComponent } from './modules/staff-rate/staff-rate-list/staff-rate-list.component';
import { DocumentTypeListComponent } from './modules/document-type/document-type-list/document-type-list.component';
import { HolidaysListComponent } from './modules/holidays/holidays-list/holidays-list.component';
import { CandidatesListComponent } from './modules/candidates/candidates-list/candidates-list.component';
import { TimeSheetsListComponent } from './modules/time-sheets/time-sheets-list/time-sheets-list.component';
import { HistoryListComponent } from './modules/history/history-list/history-list.component';
import { InvoiceListComponent } from './modules/invoice/invoice-list/invoice-list.component';
import { ReportsListComponent } from './modules/reports/reports-list/reports-list.component';
import { BookingsListComponent } from './modules/bookings/bookings-list/bookings-list.component';

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
  { path: '',   redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
