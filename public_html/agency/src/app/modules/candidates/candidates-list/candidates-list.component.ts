import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { CandidatesFormComponent } from '../candidates-form/candidates-form.component';
import { Candidates } from './candidates-list';

declare function setDataTable(options:any,table: string): void;
declare function fixedHeaderTable(ele:any): void;
@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.css']
})
export class CandidatesListComponent implements OnInit {
  candidates_data: Candidates[] = [];
  row_count   : 0;
  row_per_page : number;
  page : number;
  formData : {};
  totalPages :number;
  totalPagesArr : [];
  constructor(public API: ApiService) {}

  @ViewChild('app_candidates_form', {static: false}) app_candidates_form:CandidatesFormComponent;
  ngOnInit() {
    var data = [];
    this.geCandidates({data:[]},1,10);
   // setDataTable(null,'');
  }
  saveForm(formData: Candidates) {
    this.API.post('candidates.php',{data:formData})
    .subscribe(data => {
      if(data.status == "success") {
        this.candidates_data.push(formData);   
      }else{

      }
    });
  }
  geCandidates(data:any,page_no=0,row_per_page=0) {
    data.page = page_no;
    data.row_per_page = row_per_page;
    data.totalPagesArr = [];
    this.API.post('vaccancies.php',data)
    .subscribe(data => {
      this.candidates_data = data.data;
      this.row_count = data.totalCnt;
      this.page = page_no;
      this.row_per_page = row_per_page;
      this.totalPagesArr = data.totalPagesArr; 
    });
  }

  /* saveForm(formData: Candidates) {
    this.candidates_data.push(formData);    
  } */
  formSubmit(){
    this.app_candidates_form.saveForm();
  }

}
