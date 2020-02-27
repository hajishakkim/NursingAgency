import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TimelineComponent} from './timeline.component';
import {TimesheetComponent} from "./timesheet/timesheet.component";
import { TimelineRoutingModule } from './timeline.routing.module';

@NgModule({
  declarations: [
    TimesheetComponent,TimelineComponent
  ],
  imports: [
    CommonModule,
    TimelineRoutingModule
  ]
})
export class TimelineModule { }
