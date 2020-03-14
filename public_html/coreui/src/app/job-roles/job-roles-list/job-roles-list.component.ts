import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { JobRolesFormComponent} from '../job-roles-form/job-roles-form.component';
import { ApiService } from '../../services/api.service'
import { JobRole } from '../job-role-model';
import * as $ from 'jquery';


declare function setDataTable(options:any,table: string): void;
declare function fixedHeaderTable(ele:any): void;
declare function refreshSelectpicker(): void;


@Component({
  selector: 'app-job-roles-list',
  templateUrl: './job-roles-list.component.html',
  styleUrls: ['./job-roles-list.component.css']
})
export class JobRolesListComponent implements OnInit {
  job_role_data: JobRole[] = [];
  headers: string[];
  row_count   : 0;
  row_per_page : number;
  page : number;
  formData : {};
  totalPages :number;
  id:number;
  totalPagesArr : [];

  @ViewChild('app_job_role_form', {static: false}) app_job_role_form:JobRolesFormComponent;
  @ViewChild('getModal') getModal: ElementRef<HTMLElement>;  
  @ViewChild('getModalDelete') getModalDelete: ElementRef<HTMLElement>;  

  log: any;
  advanced_filter_search : boolean = false;
  params: {};
  list_items_data : [];
  constructor(public API: ApiService) {}

  ngOnInit() {
    var data = [];
    this.getJobRole({data:[]},1,10);
    this.getListItems();
  }

  saveForm(formData: JobRole) {
    console.log(formData);
    this.API.post('job-role.php',{data:formData})
    .subscribe(data => {
      if(data.status == "success") {
        this.getJobRole({data:[]},this.page,this.row_per_page);  
      }else{

      }
    }); 
  }

  getJobRole(data:any,page_no=0,row_per_page=0) {
    data.page = page_no;
    data.row_per_page = row_per_page;
    data.totalPagesArr = [];
    this.API.post('job-role.php',data)
    .subscribe(data => {
      this.job_role_data = data.data;
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
    this.getJobRole({data:[]},this.page,this.row_per_page);
   }
 
 
  editJobRole(data:any) {
    let el: HTMLElement = this.getModal.nativeElement;
    el.click();
    this.app_job_role_form.editForm(data);
  }
 
  deleteJobRole(id:any){
    this.id = id;
    let el: HTMLElement = this.getModalDelete.nativeElement;
    el.click();
  }

  confirmDelete(){
    this.params = {'id':this.id,'action':'delete'};
    this.deleteJobRoleData(this.params);
  }

  deleteJobRoleData(params: any) {
    this.API.post('job-role.php',{data:params})
    .subscribe(data => {
      if(data.status == "success") {
        this.getJobRole({data:[]},this.page,this.row_per_page);  
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
    this.API.post('job-role.php',data)
    .subscribe(data => {
      this.list_items_data = data;
      setTimeout(function(){
        refreshSelectpicker();
      },1000)
    });
  }
  
  formSubmit(){
    console.log(123);
    this.app_job_role_form.saveForm();
  }

  cancelSave(){
    this.getJobRole({data:[]},this.page,this.row_per_page);
  }
}
