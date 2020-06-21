import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser'
import {ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms'
import { JobsFormComponent } from './jobs-form/jobs-form.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { FormsModule } from '@angular/forms';
import { JobsRoutingModule } from './jobs-routing.module';


@NgModule({
  declarations: [JobsFormComponent, JobsListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JobsRoutingModule
  ]
})
export class JobsModule { }
