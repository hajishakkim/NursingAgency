import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
declare function refreshSelectpicker(): void;
@Component({
  selector: 'app-job-roles-form',
  templateUrl: './job-roles-form.component.html',
  styleUrls: ['./job-roles-form.component.css']
})
export class JobRolesFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    refreshSelectpicker();
  }

}
