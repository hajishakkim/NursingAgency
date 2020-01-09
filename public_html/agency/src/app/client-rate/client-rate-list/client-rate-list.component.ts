import { Component, OnInit } from '@angular/core';
declare function setDataTable(options:any,table: string): void;
@Component({
  selector: 'app-client-rate-list',
  templateUrl: './client-rate-list.component.html',
  styleUrls: ['./client-rate-list.component.css']
})
export class ClientRateListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setDataTable(null,'');
  }

}
