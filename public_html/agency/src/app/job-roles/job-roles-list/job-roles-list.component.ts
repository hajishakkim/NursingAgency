import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

declare function setDataTable(options:any,table: string): void;
declare function fixedHeaderTable(ele:any): void;
@Component({
  selector: 'app-job-roles-list',
  templateUrl: './job-roles-list.component.html',
  styleUrls: ['./job-roles-list.component.css']
})
export class JobRolesListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout( function(){ 
      fixedHeaderTable($('.listing-table-wrapper'));  
    },1000);
  }

}
