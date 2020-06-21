import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormGroup, FormBuilder } from '@angular/forms';
import { ClientRateFormComponent} from '../client-rate-form/client-rate-form.component';
import { ApiService } from '../../services/api.service'
import { ClientRate } from '../client-rate.model';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
import * as $ from 'jquery';

declare function setDataTable(options:any,table: string): void;
declare function fixedHeaderTable(ele:any): void;
declare function refreshSelectpicker(): void;

@Component({
  selector: 'app-client-rate-list',
  templateUrl: './client-rate-list.component.html',
  styleUrls: ['./client-rate-list.component.css']
})
export class ClientRateListComponent implements OnInit {
  client_rate_data: ClientRate[] = [];
  headers: string[];
  row_count   : 0;
  row_per_page : number;
  page : number;
  formData : {};
  totalPages :number;
  id:number;
  totalPagesArr : [];
  item_before_modified : any;
  @ViewChild('app_client_rate_form', {static: false}) app_client_rate_form:ClientRateFormComponent;
  @ViewChild('getModal') getModal: ElementRef<HTMLElement>;  
  @ViewChild('getModalDelete') getModalDelete: ElementRef<HTMLElement>;  
  log: any;
  advanced_filter_search : boolean = false;
  params: {};
  list_items_data : [];
  ClientRate : {};
  form: FormGroup;  
  constructor(public API: ApiService,builder: FormBuilder, private confirmationDialogService: ConfirmationDialogService) {
	   this.ClientRate = new ClientRate();
      this.form = builder.group(this.ClientRate)
  }

  ngOnInit() {
    var data = [];
    this.getClientRate({data:[]},1,10);
    this.getListItems();
    //setDataTable(null,'');
  }

  showSearch(){    
    this.advanced_filter_search = (this.advanced_filter_search) ? false : true;
    return;
  }

  saveForm(formData: ClientRate) {
    this.API.post('client-rate.php',{data:formData})
    .subscribe(data => {
      if(data.status == "success") {
        this.getClientRate({data:[]},this.page,this.row_per_page);  
      }else{

      }
    }); 
  }
    revertChanges(){
    this.client_rate_data = JSON.parse(this.item_before_modified);
  }

  formSubmit(){
    this.app_client_rate_form.saveForm();
  }

  getClientRate(data:any,page_no=0,row_per_page=0) {
    data.page = page_no;
    data.row_per_page = row_per_page;
    data.totalPagesArr = [];
    this.API.post('client-rate.php',data)
    .subscribe(data => {
      this.client_rate_data = data.data;
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
     this.getClientRate({data:[],action:'search'},this.page,this.row_per_page);
    }
  
  clearSearchFilter(){
    this.form.reset();
    refreshSelectpicker();
  }
  clearSearch(){
	   this.app_client_rate_form.resetForm();
  }
  editClientRate(data:any) {
	 this.item_before_modified = JSON.stringify(this.client_rate_data);
     this.app_client_rate_form.editForm(data);
	 setTimeout(refreshSelectpicker, 500);
  }
  public removeItem(idx:any,item:any) {
    this.confirmationDialogService.confirm('Delete','Do you really want to delete ?')
    .then((confirmed) => (confirmed) ? this.deleteItem(idx,item) : '')
    .catch(() => console.log(''));
  }
  
  deleteClientRate(id:any){
    this.id = id;
    let el: HTMLElement = this.getModalDelete.nativeElement;
    el.click();
  }

  confirmDelete(){
    this.params = {'id':this.id,'action':'delete'};
    this.deleteClientRateData(this.params);
  }

  deleteClientRateData(params: any) {
    this.API.post('client-rate.php',{data:params})
    .subscribe(data => {
      if(data.status == "success") {
        this.getClientRate({data:[]},this.page,this.row_per_page);  
      }
    }); 
  }
  public deleteItem(idx:any,item:any) {
    this.API.post('client-rate.php',{data:item,'action':'delete'})
      .subscribe(data => {
       this.getClientRate({data:[]},this.page,this.row_per_page);  
        //fixedHeaderTable($('.listing-table-wrapper'));
      });   
  }
  showAdvancedSearch(){
    this.advanced_filter_search = (this.advanced_filter_search) ? false: true;
  }
  filterSearch(){
    this.getClientRate({data:this.ClientRate,action:'search'},1,this.row_per_page);
  }

  getListItems(){
    var data = {
      'request_items': {
        'list_items': ['shift_type'],
        'modules': ['client','business_unit','jobs'],
      }
    };
    this.API.post('client-rate.php',data)
    .subscribe(data => {
      this.list_items_data = data;
      setTimeout(function(){
        refreshSelectpicker();
      },1000)
    });
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
