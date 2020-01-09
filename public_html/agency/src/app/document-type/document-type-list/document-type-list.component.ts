import { Component, OnInit } from '@angular/core';
declare function setDataTable(options:any,table: string): void;
@Component({
  selector: 'app-document-type-list',
  templateUrl: './document-type-list.component.html',
  styleUrls: ['./document-type-list.component.css']
})
export class DocumentTypeListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setDataTable(null,'');
  }

}
