import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  private module_advanced_search = new BehaviorSubject<boolean>(false);
  module_advanced_search$ = this.module_advanced_search.asObservable();
  showModuleSearch(data: boolean){
    this.module_advanced_search.next(data);
  }

  private module_form = new BehaviorSubject<boolean>(false);
  module_form$ = this.module_form.asObservable();
  showModuleForm(data: boolean){
    this.module_form.next(data);
  }
}
