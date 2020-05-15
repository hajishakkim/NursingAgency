import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClientFormComponent} from '../client-form/client-form.component';
import { ApiService } from '../../services/api.service'
import { Client } from './client-list';
import * as $ from 'jquery';

declare function setDataTable(options:any,table: string): void;
declare function fixedHeaderTable(ele:any): void;
declare function refreshSelectpicker(): void;

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  client_data: Client[] = [];
  headers: string[];
  row_count   : 0;
  row_per_page : number;
  page : number;
  formData : {};
  totalPages :number;
  id:number;
  totalPagesArr : [];

  @ViewChild('app_client_form', {static: false}) app_client_form:ClientFormComponent;
  @ViewChild('getModal') getModal: ElementRef<HTMLElement>;  
  @ViewChild('getModalDelete') getModalDelete: ElementRef<HTMLElement>;  

  log: any;
  advanced_filter_search : boolean = false;
  params: {};
  list_items_data : [];
  constructor(public API: ApiService) {}

  ngOnInit() {
    var data = [];
    this.getClient({data:[]},1,10);
    this.getListItems();
  }

  saveForm(formData: Client) {
    console.log(formData);
    this.API.post('client.php',{data:formData})
    .subscribe(data => {
      if(data.status == "success") {
        this.getClient({data:[]},this.page,this.row_per_page);  
      }else{

      }
    }); 
  }

  getClient(data:any,page_no=0,row_per_page=0) {
    data.page = page_no;
    data.row_per_page = row_per_page;
    data.totalPagesArr = [];
    this.API.post('client.php',data)
    .subscribe(data => {
      this.client_data = data.data;
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
    this.getClient({data:[]},this.page,this.row_per_page);
   }
 
 
  editClient(data:any) {
    let el: HTMLElement = this.getModal.nativeElement;
    el.click();
    this.app_client_form.editForm(data);
  }
 
  deleteClient(id:any){
    this.id = id;
    let el: HTMLElement = this.getModalDelete.nativeElement;
    el.click();
  }

  confirmDelete(){
    this.params = {'id':this.id,'action':'delete'};
    this.deleteClientData(this.params);
  }

  deleteClientData(params: any) {
    this.API.post('client.php',{data:params})
    .subscribe(data => {
      if(data.status == "success") {
        this.getClient({data:[]},this.page,this.row_per_page);  
      }
    }); 
  }

  showAdvancedSearch(){
    alert(1);
    this.advanced_filter_search = (this.advanced_filter_search) ? false: true;
    setTimeout(function(){
      refreshSelectpicker();
    },1000)

  }

  getListItems(){
    var data = {
      'request_items': {
        'list_items': ['shift_type'],
        'modules': ['client','business_unit','jobs'],
      }
    };
    this.API.post('client.php',data)
    .subscribe(data => {
      this.list_items_data = data;
      setTimeout(function(){
        refreshSelectpicker();
      },1000)
    });
  }
  
  formSubmit(){
    this.app_client_form.saveForm();
  }

  cancelSave(){
    this.getClient({data:[]},this.page,this.row_per_page);
  }

  resetForm(){
    this.app_client_form.resetForm();
  }

}