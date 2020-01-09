import { Component, OnInit } from '@angular/core';
declare function setDataTable(options:any,table: string): void;
@Component({
  selector: 'app-vacancies-list',
  templateUrl: './vacancies-list.component.html',
  styleUrls: ['./vacancies-list.component.css']
})
export class VacanciesListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setDataTable(null,'');
  }
  ngAfterContentInit(){    
    
  }

}
