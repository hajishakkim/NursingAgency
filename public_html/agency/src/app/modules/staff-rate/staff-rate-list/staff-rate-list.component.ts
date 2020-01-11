import { Component, OnInit } from '@angular/core';
declare function setDataTable(options:any,table: string): void;
@Component({
  selector: 'app-staff-rate-list',
  templateUrl: './staff-rate-list.component.html',
  styleUrls: ['./staff-rate-list.component.css']
})
export class StaffRateListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setDataTable(null,'');
  }

}
