import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffFormComponent } from './staff-form/staff-form.component';

@NgModule({
  declarations: [StaffListComponent, StaffFormComponent],
  imports: [
    CommonModule
  ]
})
export class StaffsModule { }
