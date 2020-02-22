import { Component, OnInit, ViewChild } from '@angular/core';
import { CandidatesFormComponent } from '../candidates-form/candidates-form.component';
import { Candidates } from './candidates-list';

declare function setDataTable(options:any,table: string): void;
@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.css']
})
export class CandidatesListComponent implements OnInit {
  candidates_data: Candidates[] = [];
  constructor() { }

  @ViewChild('app_candidates_form', {static: false}) app_candidates_form:CandidatesFormComponent;
  ngOnInit() {
    setDataTable(null,'');
  }

  saveForm(formData: Candidates) {
    this.candidates_data.push(formData);    
  }
  formSubmit(){
    this.app_candidates_form.saveForm();
  }

}
