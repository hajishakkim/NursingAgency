import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { StaffListComponent } from './staff-list/staff-list.component';

@NgModule({
  declarations: [FormComponent, StaffListComponent],
  imports: [
    CommonModule
  ]
})
export class StaffsModule { }
