import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClientRateFormComponent} from '../client-rate-form/client-rate-form.component';
import { ApiService } from '../../services/api.service'
import { ClientRate } from './client-rate-list';
import * as $ from 'jquery';

declare function setDataTable(options:any,table: string): void;
declare function fixedHeaderTable(ele:any): void;
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

  @ViewChild('app_client_rate_form', {static: false}) app_client_rate_form:ClientRateFormComponent;
  @ViewChild('getModal') getModal: ElementRef<HTMLElement>;  
  @ViewChild('getModalDelete') getModalDelete: ElementRef<HTMLElement>;  
  log: any;
  params: {};
  constructor(public API: ApiService) {}

  ngOnInit() {
    var data = [];
    this.getClientRate({data:[]},1,10);
    //setDataTable(null,'');
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
     this.getClientRate({data:[]},this.page,this.row_per_page);
    }
  
  
  editClientRate(data:any) {
    let el: HTMLElement = this.getModal.nativeElement;
    el.click();
    this.app_client_rate_form.editForm(data);
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

}
