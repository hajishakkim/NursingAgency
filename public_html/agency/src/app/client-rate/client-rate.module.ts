import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRateListComponent } from './client-rate-list/client-rate-list.component';
import { ClientRateFormComponent } from './client-rate-form/client-rate-form.component';



@NgModule({
  declarations: [ClientRateListComponent, ClientRateFormComponent],
  imports: [
    CommonModule
  ]
})
export class ClientRateModule { }
