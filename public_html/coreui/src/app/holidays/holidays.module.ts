import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidaysListComponent } from './holidays-list/holidays-list.component';
import { HolidaysFormComponent } from './holidays-form/holidays-form.component';
import { HolidaysRoutingModule } from './holidays-routing.module';



@NgModule({
  declarations: [HolidaysListComponent, HolidaysFormComponent],
  imports: [
    CommonModule,
    HolidaysRoutingModule
  ]
})
export class HolidaysModule { }
