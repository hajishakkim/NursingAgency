import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';    
import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './modules.component';
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
import { CommonModule } from '@angular/common';
import { AuthInterceptorService } from '../auth/auth-intercepeters.service';

@NgModule({
  declarations: [
    ModulesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ModulesRoutingModule,
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
    FormsModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptorService,
      multi : true
    }
  ],
  bootstrap: [ModulesComponent]
})
export class ModulesModule { }