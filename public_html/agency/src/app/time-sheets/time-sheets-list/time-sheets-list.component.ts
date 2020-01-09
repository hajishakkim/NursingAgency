import { Component, OnInit } from '@angular/core';
declare function setDataTable(options:any,table: string): void;
@Component({
  selector: 'app-time-sheets-list',
  templateUrl: './time-sheets-list.component.html',
  styleUrls: ['./time-sheets-list.component.css']
})
export class TimeSheetsListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setDataTable(null,'');
  }

}
