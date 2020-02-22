import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';    
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StaffsModule } from './staffs/staffs.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ClientsModule } from './clients/clients.module';
import { JobRolesModule } from './job-roles/job-roles.module';
import { JobsModule } from './jobs/jobs.module';
import { ClientRateModule } from './client-rate/client-rate.module';
import { StaffRateModule } from './staff-rate/staff-rate.module';
import { DocumentTypeModule } from './document-type/document-type.module';
import { HolidaysModule } from './holidays/holidays.module';
import { VacanciesModule } from './vacancies/vacancies.module';
import { CandidatesModule } from './candidates/candidates.module';
import { TimeSheetsModule } from './time-sheets/time-sheets.module';
import { BookingsModule } from './bookings/bookings.module';
import { HistoryModule } from './history/history.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ReportsModule } from './reports/reports.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
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
    ReportsModule,
    FormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
