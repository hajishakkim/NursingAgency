import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesFormComponent } from './candidates-form/candidates-form.component';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';



@NgModule({
  declarations: [CandidatesFormComponent, CandidatesListComponent],
  imports: [
    CommonModule
  ]
})
export class CandidatesModule { }
