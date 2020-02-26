import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeSheetsListComponent } from './time-sheets-list/time-sheets-list.component';
import { TimeSheetsFormComponent } from './time-sheets-form/time-sheets-form.component';
import { TimeSheetsRoutingModule } from './time-sheets-routing.module';



@NgModule({
  declarations: [TimeSheetsListComponent, TimeSheetsFormComponent],
  imports: [
    CommonModule,
    TimeSheetsRoutingModule
  ]
})
export class TimeSheetsModule { }
