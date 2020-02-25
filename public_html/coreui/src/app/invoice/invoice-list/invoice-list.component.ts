import { Component, OnInit } from '@angular/core';
declare function setDataTable(options:any,table: string): void;
@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setDataTable(null,'');
  }

}
