import { Component, OnInit, ViewChild , ElementRef} from '@angular/core';
import { ApiService } from '../../services/api.service'
import { CandidatesFormComponent } from '../candidates-form/candidates-form.component';
import { Candidates } from './candidates-list';

declare function setDataTable(options:any,table: string): void;
declare function fixedHeaderTable(ele:any): void;
declare function refreshSelectpicker(): void;
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
  list_items_data : [];
  gender_list : [];
  id: any;
  row_id: any;
  params: { 'id': any; 'action': string; };
  constructor(public API: ApiService) {}

  @ViewChild('app_candidates_form', {static: false}) app_candidates_form:CandidatesFormComponent;
  @ViewChild('getModal') getModal: ElementRef<HTMLElement>;  
  @ViewChild('getModalDelete') getModalDelete: ElementRef<HTMLElement>;  
  advanced_filter_search : boolean = false;
  ngOnInit() 
  {
    var data = [];
    this.getCandidates({data:[]},1,10);
    this.getListItems();
    //setDataTable(null,'');
  }
  showSearch(){    
    this.advanced_filter_search = (this.advanced_filter_search) ? false : true;
    return;
  }
  getListItems(){
    var data = {
      'request_items': {
        'list_items': ['gender'],
        'modules': ['client','business_unit','jobs','countries'],
      }
    };
    this.API.post('candidates.php',data)
    .subscribe(data => {
      this.list_items_data = data;
    });
  }

  saveForm(formData: Candidates) {
    this.API.post('candidates.php',{data:formData})
    .subscribe(data => {
      if(data.status == "success") {
        var data_saved:[];
        this.getCandidates({data_saved:[]},1,10);  
      }else{

      }
    });
   // this.candidates_data.push(formData);    
  }
  getCandidates(data:any,page_no=0,row_per_page=0) {
    data.page = page_no;
    data.row_per_page = row_per_page;
    data.totalPagesArr = [];
    this.API.post('candidates.php',data)
    .subscribe(data => {
      this.candidates_data = data.data;
      this.row_count = data.totalCnt;
      this.page = page_no;
      this.row_per_page = row_per_page;
      this.totalPagesArr = data.totalPagesArr; 
    });
  }
  getCurrentPage(rows: 0,from=''){
    this.page = from == "rpp" ? 1 : rows;
    this.row_per_page = from == "rpp" ?  rows : this.row_per_page;
    this.getCandidates({data:[]},this.page,this.row_per_page);
   } 
  formSubmit(){
    this.app_candidates_form.saveForm();
  }
  editItem(item:any){    
   // let el: HTMLElement = this.getModal.nativeElement;
    //el.click();
    this.app_candidates_form.editItem(item);
    this.getCandidates({data:[]},this.page,this.row_per_page);
  }
  deleteRow(id:any){
    this.row_id = id;
    let el: HTMLElement = this.getModalDelete.nativeElement;
    el.click();
  }
  confirmDelete(){
    var params      = this.row_id;
    params.action   = "delete";
    var send_params = {data :params}
    this.deleteCandidateData(send_params);
  }
  deleteCandidateData(data: any) {
    this.API.post('candidates.php',data)
    .subscribe(data => {
      if(data.status == "success") {
        this.getCandidates({data:[]},1,this.row_per_page);  
      }
    }); 
  }
  showAdvancedSearch(){
    this.advanced_filter_search = (this.advanced_filter_search) ? false: true;
  }
  resetForm(){
    this.app_candidates_form.resetForm();  
  }
}
