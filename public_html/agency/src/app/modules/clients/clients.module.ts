import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientListComponent } from './client-list/client-list.component';



@NgModule({
  declarations: [ClientFormComponent, ClientListComponent],
  imports: [
    CommonModule
  ]
})
export class ClientsModule { }
