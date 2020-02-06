import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

declare function setDataTable(options:any,table: string): void;
declare function fixedHeaderTable(ele:any): void;
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout( function(){ 
      fixedHeaderTable($('.listing-table-wrapper'));  
    },1000);
  }

}
