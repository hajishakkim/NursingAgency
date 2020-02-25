import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRateListComponent } from './client-rate-list/client-rate-list.component';
import { ClientRateFormComponent } from './client-rate-form/client-rate-form.component';
import {ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms'
import { ClientRateRoutingModule } from './client-rate-routing.module';



@NgModule({
  declarations: [ClientRateListComponent, ClientRateFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientRateRoutingModule
  ]
})
export class ClientRateModule { }
