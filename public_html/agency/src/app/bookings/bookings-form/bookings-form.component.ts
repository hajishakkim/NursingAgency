import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
declare function refreshSelectpicker(): void;
@Component({
  selector: 'app-bookings-form',
  templateUrl: './bookings-form.component.html',
  styleUrls: ['./bookings-form.component.css']
})
export class BookingsFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    refreshSelectpicker();
  }

}
