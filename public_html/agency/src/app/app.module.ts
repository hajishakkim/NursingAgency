import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StaffsModule } from './modules/staffs/staffs.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ClientsModule } from './modules/clients/clients.module';
import { JobRolesModule } from './modules/job-roles/job-roles.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { ClientRateModule } from './modules/client-rate/client-rate.module';
import { StaffRateModule } from './modules/staff-rate/staff-rate.module';
import { DocumentTypeModule } from './modules/document-type/document-type.module';
import { HolidaysModule } from './modules/holidays/holidays.module';
import { VacanciesModule } from './modules/vacancies/vacancies.module';
import { CandidatesModule } from './modules/candidates/candidates.module';
import { TimeSheetsModule } from './modules/time-sheets/time-sheets.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { HistoryModule } from './modules/history/history.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { ReportsModule } from './modules/reports/reports.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StaffsModule,
    DashboardModule,
    ClientsModule,
    JobRolesModule,
    JobsModule,
    ClientRateModule,
    StaffRateModule,
    DocumentTypeModule,
    HolidaysModule,
    VacanciesModule,
    CandidatesModule,
    TimeSheetsModule,
    BookingsModule,
    HistoryModule,
    InvoiceModule,
    ReportsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
