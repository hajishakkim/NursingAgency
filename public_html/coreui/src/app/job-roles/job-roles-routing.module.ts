import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobRolesListComponent } from './job-roles-list/job-roles-list.component';

const routes: Routes = [
  { path: '', component: JobRolesListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRolesRoutingModule { }
