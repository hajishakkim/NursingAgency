import {Component } from '@angular/core';
import { navItems } from '../../_nav';
import { AuthService } from '../../auth/auth.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { Router } from '@angular/router';
import { LoginModel } from '../../auth/login.model';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls : ['default-layout.component.css']
})
export class DefaultLayoutComponent {
  private lockScreen = false;
  private userName: string;
  private agency: string;
  private password: string;
  public sidebarMinimized = false;
  public navItems = navItems;
  advanced_filter_search : boolean = false;
  module_form : boolean = false;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  constructor(
    private authService : AuthService,
    private bnIdle : BnNgIdleService,
    private router: Router,
    private commonService : CommonService
  ){
    this.bnIdle.startWatching(300).subscribe((res) => {
      if(res) {
        this.onLockScreen();
      }
    });

    this.authService.user.subscribe((res : any) => {
      this.userName = res.userName;
      this.agency = res.agency;
    });
  }

  onLogout()
  {
    this.authService.logout();
  }

  onLockScreen()
  {
    this.lockScreen = true;
    this.authService.logout(false);
  }

  onUnlockScreen()
  {
    this.lockScreen = false;

    const data = new LoginModel(this.agency,this.userName,this.password);
    this.authService.onlogin(data).subscribe();
  }

  showAdvancedSearch()
  {
    this.advanced_filter_search = (this.advanced_filter_search) ? false: true;
    this.commonService.showModuleSearch(this.advanced_filter_search);
  }
  showModuleForm()
  {
    this.module_form = (this.module_form) ? false: true;
    this.commonService.showModuleForm(this.module_form);
  }
}
