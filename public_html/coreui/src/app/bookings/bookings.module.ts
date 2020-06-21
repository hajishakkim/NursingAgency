import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingsFormComponent } from './bookings-form/bookings-form.component';
import { BookingRoutingModule } from './bookings-routing.module.'
import { BookingsListComponent } from './bookings-list/bookings-list.component';



@NgModule({
  imports: [
    FormsModule,
    BookingRoutingModule,
  ],
  declarations: [ 
    BookingsFormComponent,
    BookingsListComponent
   ]
})
export class BookingsModule { }