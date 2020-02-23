import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingsListComponent } from '../bookings/bookings-list/bookings-list.component';

const routes: Routes = [
  { path: '', component: BookingsListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
