import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidaysListComponent } from './holidays-list/holidays-list.component';
import { HolidaysFormComponent } from './holidays-form/holidays-form.component';



@NgModule({
  declarations: [HolidaysListComponent, HolidaysFormComponent],
  imports: [
    CommonModule
  ]
})
export class HolidaysModule { }
