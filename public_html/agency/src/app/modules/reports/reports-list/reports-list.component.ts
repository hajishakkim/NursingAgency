import { Component, OnInit } from '@angular/core';
declare function setDataTable(options:any,table: string): void;
@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css']
})
export class ReportsListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setDataTable(null,'');
  }

}
