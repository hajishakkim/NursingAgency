import { Component, OnInit, ViewChild } from '@angular/core';
import { CandidatesFormComponent } from '../candidates-form/candidates-form.component';
import { ApiService } from '../../services/api.service'
import { Candidates } from './candidates-list';

declare function setDataTable(options:any,table: string): void;
@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.css']
})
export class CandidatesListComponent implements OnInit {
  candidates_data: Candidates[] = [];
  constructor(public API: ApiService) { }

  @ViewChild('app_candidates_form', {static: false}) app_candidates_form:CandidatesFormComponent;
  ngOnInit() {
    setDataTable(null,'');
  }

  saveForm(formData: Candidates) {
    this.onCloseModal();
    /*this.API.post('candidates.php',{data:formData})
    .subscribe(data => {
      this.candidates_data.push(formData);     
    });*/
  }
  formSubmit(){
    this.app_candidates_form.saveForm();
  }

  closeModal(){
    console.log('close');
  }

  onCloseModal(){
    jQuery("#addnew-modal").modal("hide");  
  }
}
