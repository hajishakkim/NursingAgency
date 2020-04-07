import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup, FormBuilder } from '@angular/forms';
import { VacanciesFormComponent } from '../vacancies-form/vacancies-form.component';
import { ApiService } from '../../services/api.service'
import {VaccancyGridManager, Vaccancies, VaccanciesLabels} from '../vaccancies.model';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
import * as $ from 'jquery';

declare function setDataTable(options:any,table: string): void;
declare function fixedHeaderTable(ele:any): void;
declare function refreshSelectpicker(): void;

@Component({
  selector: 'app-vacancies-list',
  templateUrl: './vacancies-list.component.html',
  styleUrls: ['./vacancies-list.component.css']
})
export class VacanciesListComponent implements OnInit {
  vacancy_data: Vaccancies[] = [];
  headers: string[];
  row_count   : 0;
  row_per_page : number;
  page : number;
  formData : {};
  totalPages :number;
  totalPagesArr : [];
  @ViewChild('app_vacancies_form', {static: false}) app_vacancies_form:VacanciesFormComponent;
  log: any;
  advanced_filter_search : boolean = false;
  list_items_data : [];
  form: FormGroup;  
  vaccancy : {};
  item_before_modified : any;
  formLabels :{};
  module_list_arr : any = [];
  grid_show_items_count : number = 0;
  grid_show_items_limit : number = 2;
  constructor(public API: ApiService,builder: FormBuilder, private confirmationDialogService: ConfirmationDialogService) {
      this.vaccancy = new Vaccancies();
      this.formLabels = new VaccancyGridManager();
      this.form = builder.group(this.vaccancy)
  }

  ngOnInit() {
      var data = [];
      this.getVaccanies({data:[]},1,10);
      this.getListItems();        
      //setDataTable(null,'');
  }
  
  ngAfterContentInit(){  
  }  

  showSearch(){    
    this.advanced_filter_search = (this.advanced_filter_search) ? false : true;
    return;
  }
  saveForm(formData: Vaccancies) {
    this.API.post('vaccancies.php',{data:formData,'action':'save'})
    .subscribe(data => {
      if(data.status == "success") {
        this.vacancy_data.push(formData);   
      }else{

      }
    });
  }
  getListItems(){
    var data = {
      'request_items': {
        'list_items': ['shift_type'],
        'modules': ['client','business_unit','jobs'],
        'workbench': 'vaccancy'
      }
    };
    this.API.post('vaccancies.php',data)
    .subscribe(data => {
      this.list_items_data = data;
      this.setListPreference();
      setTimeout(function(){
        refreshSelectpicker();        
      },1000)
    });
  }    
  setListPreference(){    
    let module_list_obj = new Vaccancies();
    this.module_list_arr = Object.keys(module_list_obj);
    this.list_items_data['workbench']['list_preference_data'] = this.list_items_data['workbench']['list_preference_data'].split(',');
    for ( let model_item of this.module_list_arr ) {
      this.formLabels[model_item]['show_current'] = (this.list_items_data['workbench']['list_preference_data'].indexOf(model_item) >=0 || this.formLabels[model_item]['show_default'] == 0) ? 0 : 1;
      if(this.formLabels[model_item]['show_current'] == 1) this.grid_show_items_count++;
    } 
  }
  objectKeys(obj) {
    return Object.keys(obj);
  }
  getVaccanies(data:any,page_no=0,row_per_page=0) {
    data.page = page_no;
    data.row_per_page = row_per_page;
    data.totalPagesArr = [];
    this.API.post('vaccancies.php',data)
    .subscribe(data => {
      this.vacancy_data = data.data;
      this.row_count = data.totalCnt;
      this.page = page_no;
      this.row_per_page = row_per_page;
      this.totalPagesArr = data.totalPagesArr; 
      fixedHeaderTable($('.listing-table-wrapper'));
    });    
  }
  
  getCurrentPage(rows: 0,from=''){
     this.page = from == "rpp" ? 1 : rows;
     this.row_per_page = from == "rpp" ?  rows : this.row_per_page;
     this.getVaccanies({data:this.vaccancy,action:'search'},this.page,this.row_per_page);
  }

  formSubmit(){
    this.app_vacancies_form.saveForm();
  }

  revertChanges(){
    this.vacancy_data = JSON.parse(this.item_before_modified);
  }

  editItem(item:any){    
    this.item_before_modified = JSON.stringify(this.vacancy_data);
    this.app_vacancies_form.editItem(item);
  }

  showAdvancedSearch(){
    this.advanced_filter_search = (this.advanced_filter_search) ? false: true;
  }

  filterSearch(){
    this.getVaccanies({data:this.vaccancy,action:'search'},1,this.row_per_page);
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
  public deleteItem(idx:any,item:any) {
    this.API.post('vaccancies.php',{data:item,'action':'delete'})
      .subscribe(data => {
        this.vacancy_data.splice(idx,1);
        fixedHeaderTable($('.listing-table-wrapper'));
      });   
  }
  public removeItem(idx:any,item:any) {
    this.confirmationDialogService.confirm('Delete','Do you really want to delete ?')
    .then((confirmed) => (confirmed) ? this.deleteItem(idx,item) : '')
    .catch(() => console.log(''));
  }
  public listViewUpdate(e:any,list_item){
    let select_state = (this.formLabels[list_item]['show_current'] == 1) ? 0 : 1;
    if(select_state) {
      this.grid_show_items_count++;
      this.list_items_data['workbench']['list_preference_data'].splice(this.list_items_data['workbench']['list_preference_data'].indexOf(list_item),1);            
    }
    if(!select_state && this.grid_show_items_count > 0) { 
      if(this.list_items_data['workbench']['list_preference_data'].indexOf(list_item) < 0){
        this.list_items_data['workbench']['list_preference_data'].push(list_item);
      }
      this.grid_show_items_count--;      
    }
    this.formLabels[list_item]['show_current'] = (this.formLabels[list_item]['show_current'] == 1) ? 0 : 1;
    setTimeout(function(){
      fixedHeaderTable($('.listing-table-wrapper'));
    },100)
  }
  public saveListView() {
    let data = {
      'module': 'vaccancy',
      'list_preference_data' : this.list_items_data['workbench']['list_preference_data'].join(',')
    }
    this.API.post('vaccancies.php',{'data':data,'action':'save_grid'})
      .subscribe(data => {
        
      });   
  }
}
