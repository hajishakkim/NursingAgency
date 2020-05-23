import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormGroup, FormBuilder } from '@angular/forms';
import { StaffRateFormComponent} from '../staff-rate-form/staff-rate-form.component';
import { ApiService } from '../../services/api.service'
import { StaffRate } from '../staff-rate.model';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
import * as $ from 'jquery';

declare function setDataTable(options:any,table: string): void;
declare function fixedHeaderTable(ele:any): void;
declare function refreshSelectpicker(): void;

@Component({
  selector: 'app-staff-rate-list',
  templateUrl: './staff-rate-list.component.html',
  styleUrls: ['./staff-rate-list.component.css']
})
export class StaffRateListComponent implements OnInit {
  staff_rate_data: StaffRate[] = [];
  headers: string[]; 
  row_count   : 0;
  row_per_page : number;
  advanced_filter_search : boolean = false;
  page : number;
  formData : {};
  totalPages :number;
  totalPagesArr : [];
  id:number;
  staffRate : {};
  list_items_data : [];
  form: FormGroup;
   item_before_modified : any;
  @ViewChild('app_staff_rate_form', {static: false}) app_staff_rate_form:StaffRateFormComponent;
  @ViewChild('getModal') getModal: ElementRef<HTMLElement>;  
  @ViewChild('getModalDelete') getModalDelete: ElementRef<HTMLElement>;  
  log: any;
  params: {};
  constructor(public API: ApiService,builder: FormBuilder, private confirmationDialogService: ConfirmationDialogService) {
	   this.staffRate = new StaffRate();
	   console.log(this.staffRate);
      this.form = builder.group(this.staffRate);
  }

  ngOnInit() {
    var data = [];
    this.getStaffRate({data:[]},1,10);
	this.getListItems();
  }

  saveForm(formData: StaffRate) {
    console.log(formData);
    this.API.post('staff-rate.php',{data:formData})
    .subscribe(data => {
      if(data.status == "success") {
        this.getStaffRate({data:[],action:'search'},this.page,this.row_per_page);  
      }else{

      }
    }); 
  }
  clearForm(){
	this.app_staff_rate_form.clearForm();  
	  
  }
    filterSearch(){
    this.getStaffRate({data:this.staffRate,action:'search'},1,this.row_per_page);
  }

  formSubmit(){
    this.app_staff_rate_form.saveForm();
  }
    showAdvancedSearch(){    
    this.advanced_filter_search = (this.advanced_filter_search) ? false : true;
    return;
  }
    getListItems(){
    var data = {
      'request_items': {
        'list_items': ['shift_type','employee_type'],
        'modules': ['client','business_unit','jobs'],
      }
    };
    this.API.post('staff-rate.php',data)
    .subscribe(data => {
      this.list_items_data = data;
      setTimeout(function(){
        refreshSelectpicker();
      },1000)
    });
  }

  getStaffRate(data:any,page_no=0,row_per_page=0) {
    data.page = page_no;
    data.row_per_page = row_per_page;
    data.totalPagesArr = [];
    this.API.post('staff-rate.php',data)
    .subscribe(data => {
      this.staff_rate_data = data.data;
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
    this.getStaffRate({data:[],action:'search'},this.page,this.row_per_page);
  } 
  revertChanges(){
    this.staff_rate_data = JSON.parse(this.item_before_modified);
  }
  editStaffRate(data:any) {
	this.item_before_modified = JSON.stringify(this.staff_rate_data);
    this.app_staff_rate_form.editForm(data);
	setTimeout(refreshSelectpicker, 500);
    
  }
  
  deleteStaffRate(id:any){
    this.id = id;
    let el: HTMLElement = this.getModalDelete.nativeElement;
    el.click();
  }

  /*confirmDelete(){
    this.params = {'id':this.id,'action':'delete'};
    this.deleteStaffRateData(this.params);
  }*/
   public removeItem(idx:any,item:any) {
	this.params = {'id':idx,'action':'delete'};
    this.confirmationDialogService.confirm('Delete','Do you really want to delete ?')
    .then((confirmed) => (confirmed) ? this.deleteItem(this.params) : '')
    .catch(() => console.log(''));
  }


  deleteItem(params: any) {
    this.API.post('staff-rate.php',{data:params})
    .subscribe(data => {
      if(data.status == "success") {
        this.getStaffRate({data:[]},this.page,this.row_per_page);  
      }
    }); 
  }
clearSearch(){
    this.form.reset();
    refreshSelectpicker();
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