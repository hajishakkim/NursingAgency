import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

declare function setDataTable(options:any,table: string): void;
declare function fixedHeaderTable(ele:any): void;
@Component({
  selector: 'app-document-type-list',
  templateUrl: './document-type-list.component.html',
  styleUrls: ['./document-type-list.component.css']
})
export class DocumentTypeListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout( function(){ 
      fixedHeaderTable($('.listing-table-wrapper'));  
    },1000);
  }

}
