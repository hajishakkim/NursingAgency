import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { JobsFormComponent } from '../jobs-form/jobs-form.component';
import { ApiService } from '../../services/api.service'
import {FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
import {Jobs} from '../jobs.model';
import { Observable, of } from 'rxjs';
import * as $ from 'jquery';

declare function setDataTable(options:any,table: string): void;
declare function fixedHeaderTable(ele:any): void;
declare function refreshSelectpicker(): void;

declare function setDataTable(options:any,table: string): void;
declare function fixedHeaderTable(ele:any): void;
@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {

  jobs_data: Jobs[] = [];
  headers: string[];
  row_count   : 0;
  row_per_page : number;
  page : number;
  formData : {};
  totalPages :number;
  id:number;
  totalPagesArr : [];
  form: FormGroup;  
  @ViewChild('app_jobs_form', {static: false}) app_jobs_form:JobsFormComponent;
  @ViewChild('getModal') getModal: ElementRef<HTMLElement>;  
  @ViewChild('getModalDelete') getModalDelete: ElementRef<HTMLElement>; 

  log: any;
  advanced_filter_search : boolean = false;
  params: {};
  list_items_data : [];
  job : {};
   constructor(public API: ApiService,builder: FormBuilder,private confirmationDialogService: ConfirmationDialogService) {
	  this.job = new Jobs();
      this.form = builder.group(this.job)
  }


  ngOnInit() {
    var data = [];
    this.getJobs({data:[],action:'search'},1,10);
    this.getListItems();
  }

  saveForm(formData: Jobs) {
    console.log(formData);
    this.API.post('jobs.php',{data:formData})
    .subscribe(data => {
      if(data.status == "success") {
        this.getJobs({data:[]},this.page,this.row_per_page);  
      }else{

      }
    }); 
  }
  
  getJobs(data:any,page_no=0,row_per_page=0) {
    data.page = page_no;
    data.row_per_page = row_per_page;
    data.totalPagesArr = [];
    this.API.post('jobs.php',data)
    .subscribe(data => {
      this.jobs_data = data.data;
      this.row_count = data.totalCnt;
      this.page = page_no;
      this.row_per_page  = row_per_page;
      this.totalPagesArr = data.totalPagesArr; 
    });
    setTimeout( function(){
      fixedHeaderTable($('.listing-table-wrapper'));
    },1000);
  }
  getCurrentPage(rows: 0,from=''){
    this.page = from == "rpp" ? 1 : rows;
    this.row_per_page = from == "rpp" ?  rows : this.row_per_page;
    this.getJobs({data:[],action:'search'},this.page,this.row_per_page);
   }
 
 
  editJob(data:any) {
    let el: HTMLElement = this.getModal.nativeElement;
    el.click();
    this.app_jobs_form.editForm(data);
  }
 
  deleteJob(id:any){
    this.id = id;
    let el: HTMLElement = this.getModalDelete.nativeElement;
    el.click();
  }



  deleteJobData(params: any,rdx:any) {
    this.API.post('jobs.php',{data:params})
    .subscribe(data => {
      if(data.status == "success") {
			this.getJobs({data:[]},1,this.row_per_page); 
      }
    }); 
  }
  /* public deleteItem(idx:any,item:any) {
    this.API.post('jobs.php',{data:item,'action':'delete'})
      .subscribe(data => {
        this.vacancy_data.splice(idx,1);
        fixedHeaderTable($('.listing-table-wrapper'));
      });   
  }
*/
  showAdvancedSearch(){
    this.advanced_filter_search = (this.advanced_filter_search) ? false: true;
    setTimeout(function(){
      refreshSelectpicker();
    },1000)

  }
  clearSearch(){
    this.app_jobs_form.resetForm();
    setTimeout(function(){
		refreshSelectpicker();
      },500)
  }
  
  filterSearch(){
    this.getJobs({data:this.job,action:'search'},1,this.row_per_page);
  }
  clearSearchFilter(){
    this.form.reset();
    refreshSelectpicker();
  }
  getListItems(){
    var data = {
      'request_items': {
        'list_items': ['shift_type'],
        'modules': ['client','business_unit','jobs'],
      }
    };
    this.API.post('jobs.php',data)
    .subscribe(data => {
      this.list_items_data = data;
      setTimeout(function(){
        refreshSelectpicker();
      },1000)
    });
  }
  
  formSubmit(){
    this.app_jobs_form.saveForm();
  }

  cancelSave(){
    this.getJobs({data:[]},this.page,this.row_per_page);
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
   public removeItem(idx:any,rdx:any) {
	this.params = {'jobs_id':idx,'action':'delete'};
    this.confirmationDialogService.confirm('Delete','Do you really want to delete ?')
    .then((confirmed) => (confirmed) ? this.deleteJobData(this.params,rdx) : '')
    .catch(() => console.log(''));
  }
}
  