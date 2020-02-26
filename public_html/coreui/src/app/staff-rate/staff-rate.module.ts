import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffRateFormComponent } from './staff-rate-form/staff-rate-form.component';
import { StaffRateListComponent } from './staff-rate-list/staff-rate-list.component';
import { StaffRateRoutingModule } from './staff-routing.module';



@NgModule({
  declarations: [StaffRateFormComponent, StaffRateListComponent],
  imports: [
    CommonModule,
    StaffRateRoutingModule
  ]
})
export class StaffRateModule { }
