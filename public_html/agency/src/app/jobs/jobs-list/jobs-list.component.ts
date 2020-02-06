import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

declare function setDataTable(options:any,table: string): void;
declare function fixedHeaderTable(ele:any): void;
@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout( function(){ 
      fixedHeaderTable($('.listing-table-wrapper'));  
    },1000);
  }

}
