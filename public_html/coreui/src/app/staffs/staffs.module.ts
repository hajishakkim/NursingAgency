import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffFormComponent } from './staff-form/staff-form.component';
import {ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms'
import { StaffRoutingModule } from './staff-rounting.module';

@NgModule({
  declarations: [StaffListComponent, StaffFormComponent],
  imports: [
    CommonModule,
	ReactiveFormsModule,
    StaffRoutingModule
  ]
})
export class StaffsModule { }
