import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
declare function refreshSelectpicker(): void;
@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    refreshSelectpicker();
  }

}
