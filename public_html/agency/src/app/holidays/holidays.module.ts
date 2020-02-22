import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidaysListComponent } from './holidays-list/holidays-list.component';
import { HolidaysFormComponent } from './holidays-form/holidays-form.component';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarHeaderComponent } from './holidays-list/calendar-header.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    
  ],
  declarations: [HolidaysListComponent,CalendarHeaderComponent],
  exports: [HolidaysListComponent, CalendarHeaderComponent]
})
export class HolidaysModule { }
