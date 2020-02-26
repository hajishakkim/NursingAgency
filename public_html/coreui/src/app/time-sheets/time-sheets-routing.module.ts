import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimeSheetsListComponent } from './time-sheets-list/time-sheets-list.component';

const routes: Routes = [
  { path: '', component: TimeSheetsListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeSheetsRoutingModule { }
