import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientRateListComponent } from './client-rate-list/client-rate-list.component';

const routes: Routes = [
  { path: '', component: ClientRateListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRateRoutingModule { }
