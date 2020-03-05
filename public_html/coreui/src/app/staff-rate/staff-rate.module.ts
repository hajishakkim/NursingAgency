import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffRateFormComponent } from './staff-rate-form/staff-rate-form.component';
import { StaffRateListComponent } from './staff-rate-list/staff-rate-list.component';
import {ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms'
import { StaffRateRoutingModule } from './staff-routing.module';



@NgModule({
  declarations: [StaffRateFormComponent, StaffRateListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StaffRateRoutingModule
  ]
})
export class StaffRateModule { }
