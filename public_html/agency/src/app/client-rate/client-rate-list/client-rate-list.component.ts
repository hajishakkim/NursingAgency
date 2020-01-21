import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientRateFormComponent} from '../client-rate-form/client-rate-form.component';
import { ApiService } from './api.service';
import { ClientRate } from './client-rate-list';
import { Observable, of } from 'rxjs';
import * as $ from 'jquery';

declare function setDataTable(options:any,table: string): void;
@Component({
  selector: 'app-client-rate-list',
  templateUrl: './client-rate-list.component.html',
  styleUrls: ['./client-rate-list.component.css']
})
export class ClientRateListComponent implements OnInit {
  client_rate_data: ClientRate[] = [];
  headers: string[];

  @ViewChild('app_client_rate_form', {static: false}) app_client_rate_form:ClientRateFormComponent;
  log: any;
  constructor(public api: ApiService) {}

  ngOnInit() {
    this.getClientRateData();
    //setDataTable(null,'');
  }
  getClientRateData() {
    this.api.getClientRateData()
    .subscribe(resp => {
      const keys = resp.headers.keys();
      this.headers = keys.map(key =>
        `${key}: ${resp.headers.get(key)}`);
  
      for (const data of resp.body) {
        //console.log(data)
        this.client_rate_data.push(data);
      }
      
      setTimeout( function(){
        //setDataTable(null,'');
      },1000);
    });
    
  }

  saveForm(formData: ClientRate) {
    this.client_rate_data.push(formData);    
  }
  formSubmit(){
    this.app_client_rate_form.saveForm();
  }

}
