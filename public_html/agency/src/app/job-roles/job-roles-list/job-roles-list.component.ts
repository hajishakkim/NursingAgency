import { Component, OnInit } from '@angular/core';
declare function setDataTable(options:any,table: string): void;
@Component({
  selector: 'app-job-roles-list',
  templateUrl: './job-roles-list.component.html',
  styleUrls: ['./job-roles-list.component.css']
})
export class JobRolesListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setDataTable(null,'');
  }

}
