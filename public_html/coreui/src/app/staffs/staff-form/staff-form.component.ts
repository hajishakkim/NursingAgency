import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
declare function refreshSelectpicker(): void;
@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.css']
})
export class StaffFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    refreshSelectpicker();
  }

}
