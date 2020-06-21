import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceRoutingModule } from './invoice-routing.module';



@NgModule({
  declarations: [InvoiceListComponent],
  imports: [
    CommonModule,
    InvoiceRoutingModule
  ]
})
export class InvoiceModule { }
