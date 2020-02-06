import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
declare function refreshSelectpicker(): void;
@Component({
  selector: 'app-staff-rate-form',
  templateUrl: './staff-rate-form.component.html',
  styleUrls: ['./staff-rate-form.component.css']
})
export class StaffRateFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    refreshSelectpicker();
  }

}
