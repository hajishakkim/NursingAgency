import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsFormComponent } from './jobs-form/jobs-form.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';



@NgModule({
  declarations: [JobsFormComponent, JobsListComponent],
  imports: [
    CommonModule
  ]
})
export class JobsModule { }
