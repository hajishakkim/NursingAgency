import { Component, OnInit, ViewChild , ElementRef} from '@angular/core';
import { ApiService } from '../../services/api.service'
import { StaffList } from '../staffs.model';
import {FormGroup, FormBuilder } from '@angular/forms';
import { StaffFormComponent } from '../staff-form/staff-form.component';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
import { Observable, of } from 'rxjs';
import * as $ from 'jquery';
declare function setDataTable(options:any,table: string): void;
declare function fixedHeaderTable(ele:any): void;
declare function refreshSelectpicker(): void;
@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {

  staff_data: StaffList[] = [];
  headers: string[];
  row_count   : 0;
  row_per_page : number;
  page : number;
  formData : {};
  totalPages :number;
  id:number;
  totalPagesArr : [];
  list_items_data : [];
  form: FormGroup;
  stafflist = {};
  item_before_modified : any;
  advanced_filter_search : boolean = false;
 constructor(public API: ApiService,builder: FormBuilder,private confirmationDialogService: ConfirmationDialogService) {
	  this.stafflist = new StaffList();
      this.form = builder.group(this.stafflist)
  }

  @ViewChild('app_staff_form', {static: false}) app_staff_form:StaffFormComponent;
  ngOnInit() {
    var data = [];
    this.getStaffData({data:[]},1,10);
	 this.getListItems();
    
  }
    getListItems(){
    var data = {
      'request_items': {
        'list_items': ['gender','employee_type','shift_type'],
        'modules': ['client','business_unit','jobs','countries'],
      }
    };
    this.API.post('staff.php',data)
    .subscribe(data => {
      this.list_items_data = data;
    });
  }
  resetForm(){
	 this.app_staff_form.resetForm();  
	  
  }
  editItem(item:any){    
   this.item_before_modified = JSON.stringify(this.staff_data);
    this.app_staff_form.editItem(item);
  }
  
  saveForm(formData: StaffList) {
    this.API.post('staff.php',{data:formData})
    .subscribe(data => {
      if(data.status == "success") {
        this.getStaffData({data:[]},this.page,this.row_per_page);  
      }else{

      }
    }); 
  }
   formSubmit(){
    this.app_staff_form.saveForm();
  }
showAdvancedSearch(){
    this.advanced_filter_search = (this.advanced_filter_search) ? false: true;
  }
  //formSubmit(){
    //this.app_client_rate_form.saveForm();
  //}
  getStaffData(data:any,page_no=0,row_per_page=0) {
    data.page = page_no;
    data.row_per_page = row_per_page;
    data.totalPagesArr = [];
    this.API.post('staff.php',data)
    .subscribe(data => {
      this.staff_data = data.data;
      this.row_count = data.totalCnt;
      this.page = page_no;
      this.row_per_page  = row_per_page;
      this.totalPagesArr = data.totalPagesArr; 
    });
    setTimeout( function(){
      fixedHeaderTable($('.listing-table-wrapper'));
    },500);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }
  private log(message: string) {
    console.log(message);
  }
    clearSearchFilter(){
    this.form.reset();
    refreshSelectpicker();
  }
  	filterSearch(){
		this.getStaffData({data:this.stafflist,action:'search'},1,this.row_per_page);
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
  revertChanges(){
    this.staff_data = JSON.parse(this.item_before_modified);
  }
    public deleteItem(idx:any,item:any) {
    this.API.post('staff.php',{data:item,'action':'delete'})
      .subscribe(data => {
		this.getStaffData({data:[]},this.page,this.row_per_page);
        fixedHeaderTable($('.listing-table-wrapper'));
      });   
  }
    getCurrentPage(rows: 0,from=''){
    this.page = from == "rpp" ? 1 : rows;
    this.row_per_page = from == "rpp" ?  rows : this.row_per_page;
    this.getStaffData({data:this.stafflist,action:'search'},this.page,this.row_per_page);
   } 
   public removeItem(idx:any,item:any) {
    this.confirmationDialogService.confirm('Delete','Do you really want to delete ?')
    .then((confirmed) => (confirmed) ? this.deleteItem(idx,item) : '')
    .catch(() => console.log(''));
  }
}
