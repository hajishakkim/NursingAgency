import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientRoutingModule } from './client-routing.module';



@NgModule({
  declarations: [ClientFormComponent, ClientListComponent],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientsModule { }
