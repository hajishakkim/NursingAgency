import { Component, OnInit, ViewChild , ElementRef} from '@angular/core';
import { ApiService } from '../../services/api.service'
import {FormGroup, FormBuilder } from '@angular/forms';
import { CandidatesFormComponent } from '../candidates-form/candidates-form.component';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
import { Candidates } from '../candidates.model';
import { CommonService } from '../../services/common.service';
import * as $ from 'jquery';

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
  form: FormGroup; 
  item_before_modified : any;
  candidate : {};
  params: { 'id': any; 'action': string; };
  constructor(public API: ApiService,builder: FormBuilder,private confirmationDialogService: ConfirmationDialogService, private commonService : CommonService) {
	  this.candidate = new Candidates();
      this.form = builder.group(this.candidate);
	  commonService.module_advanced_search$.subscribe(data => {
		this.advanced_filter_search = data;
	})

    commonService.module_form$.subscribe(data => {
      try{
      document.getElementById('module_form').click();
        setTimeout(function(){
          refreshSelectpicker()  
        },500)
      }catch(e){}        
    })
  }

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
  getListItems(){
    var data = {
      'request_items': {
        'list_items': ['gender','employee_type'],
        'modules': ['client','business_unit','jobs','countries'],
      }
    };
    this.API.post('candidates.php',data)
    .subscribe(data => {
      this.list_items_data = data;
    });
  }
     revertChanges(){
    this.candidates_data = JSON.parse(this.item_before_modified);
  }
	filterSearch(){
		this.getCandidates({data:this.candidate,action:'search'},1,this.row_per_page);
	  }
  saveForm(formData: Candidates) {
    this.API.post('candidates.php',{data:formData,'action':'save'})
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
	setTimeout( function(){
      fixedHeaderTable($('.listing-table-wrapper'));
    },1000);
  }
  getCurrentPage(rows: 0,from=''){
    this.page = from == "rpp" ? 1 : rows;
    this.row_per_page = from == "rpp" ?  rows : this.row_per_page;
    this.getCandidates({data:[],action:'search'},this.page,this.row_per_page);
   } 
  formSubmit(){
    this.app_candidates_form.saveForm();
  }
  editItem(item:any){    
   this.item_before_modified = JSON.stringify(this.candidates_data);
    this.app_candidates_form.editItem(item);
    //this.getCandidates({data:[]},this.page,this.row_per_page);
  }
	public removeItem(idx:any,item:any) {
	this.confirmationDialogService.confirm('Delete','Do you really want to delete ?')
	.then((confirmed) => (confirmed) ? this.deleteItem(idx,item) : '')
	.catch(() => console.log(''));
  }
    public deleteItem(idx:any,item:any) {
    this.API.post('candidates.php',{data:item,'action':'delete'})
      .subscribe(data => {
		this.getCandidates({data:[],action:'search'},this.page,this.row_per_page);
       // this.candidates_data.splice(idx,1);
      //  fixedHeaderTable($('.listing-table-wrapper'));
      });   
  }
  deleteRow(id:any){
    this.row_id = id;
    let el: HTMLElement = this.getModalDelete.nativeElement;
    el.click();
  }
  clearSearchFilter(){
    this.form.reset();
    refreshSelectpicker();
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
  showListLabel(list_id:any,type:any,list_item:any){    
    if(typeof(list_id) == 'undefined') return '';
    var _list_item = [];
    _list_item = this.list_items_data[type][list_item];
    var list = _list_item.filter(function (items) { if(type == 'modules') {
      return items.id == list_id
     }else if(type == 'list_items') {
      return items.list_item_id == list_id
     }
     });
    var item = list[0];
    if(typeof(item) == 'undefined' && list_item == 'business_unit'){
      list = _list_item.filter(function (items) {
      return items.id == list_id
     });
    }
    if(typeof(item) != 'undefined'){
      if(type == 'modules') {
        return item.label;
       }else if(type == 'list_items') {
        return item.list_item_title;
       }      
    }else{
      return '--';
    }    
  }
}
