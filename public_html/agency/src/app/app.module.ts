import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    VacanciesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
