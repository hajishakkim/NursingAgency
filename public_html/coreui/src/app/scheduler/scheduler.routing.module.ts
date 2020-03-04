import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShedulerComponent } from './sheduler/sheduler.component';

const routes: Routes = [
  { path: '', component: ShedulerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShedulerRoutingModule { }