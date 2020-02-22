import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesFormComponent } from './candidates-form/candidates-form.component';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';
import {BrowserModule} from '@angular/platform-browser'
import {ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms'
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CandidatesFormComponent, CandidatesListComponent],
  imports: [
    CommonModule,ReactiveFormsModule
  ]
})
export class CandidatesModule { }
