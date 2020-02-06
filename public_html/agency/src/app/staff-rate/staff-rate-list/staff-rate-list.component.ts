import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

declare function setDataTable(options:any,table: string): void;
declare function fixedHeaderTable(ele:any): void;

@Component({
  selector: 'app-staff-rate-list',
  templateUrl: './staff-rate-list.component.html',
  styleUrls: ['./staff-rate-list.component.css']
})
export class StaffRateListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //setTimeout( function(){ 
      fixedHeaderTable($('.listing-table-wrapper'));  
    //},100);
  }

}
