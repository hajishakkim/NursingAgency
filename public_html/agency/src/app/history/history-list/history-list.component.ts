import { Component, OnInit } from '@angular/core';
declare function setDataTable(options:any,table: string): void;
@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setDataTable(null,'');
  }

}
