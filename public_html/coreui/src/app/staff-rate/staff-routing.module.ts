import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffRateListComponent } from './staff-rate-list/staff-rate-list.component';

const routes: Routes = [
  { path: '', component: StaffRateListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRateRoutingModule { }
