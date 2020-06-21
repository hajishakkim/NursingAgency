import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentTypeListComponent } from './document-type-list/document-type-list.component';
import { DocumentTypeFormComponent } from './document-type-form/document-type-form.component';



@NgModule({
  declarations: [DocumentTypeListComponent, DocumentTypeFormComponent],
  imports: [
    CommonModule
  ]
})
export class DocumentTypeModule { }
