import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DayPilotModule} from "daypilot-pro-angular";

import { ShedulerComponent } from './sheduler/sheduler.component';
import { ShedulerRoutingModule } from './scheduler.routing.module';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';



@NgModule({
  declarations: [ShedulerComponent],
  imports: [
    CommonModule,
    ShedulerRoutingModule,
    FormsModule,
    DayPilotModule,
    NgSelectModule,
    AngularDateTimePickerModule
  ]
})
export class SchedulerModule { }
