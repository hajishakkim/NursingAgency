import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobRolesFormComponent } from './job-roles-form/job-roles-form.component';
import { JobRolesListComponent } from './job-roles-list/job-roles-list.component';



@NgModule({
  declarations: [JobRolesFormComponent, JobRolesListComponent],
  imports: [
    CommonModule
  ]
})
export class JobRolesModule { }
