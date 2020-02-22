import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingsListComponent } from './bookings-list/bookings-list.component';
import { BookingsFormComponent } from './bookings-form/bookings-form.component';



@NgModule({
  declarations: [BookingsListComponent, BookingsFormComponent],
  imports: [
    CommonModule
  ]
})
export class BookingsModule { }
