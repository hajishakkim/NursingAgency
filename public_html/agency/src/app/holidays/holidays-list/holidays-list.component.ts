import { Component, OnInit } from '@angular/core';
declare function setDataTable(options:any,table: string): void;
@Component({
  selector: 'app-holidays-list',
  templateUrl: './holidays-list.component.html',
  styleUrls: ['./holidays-list.component.css']
})
export class HolidaysListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //setDataTable(null,'');
  }

}
