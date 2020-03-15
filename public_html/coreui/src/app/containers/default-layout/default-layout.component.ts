import {Component } from '@angular/core';
import { navItems } from '../../_nav';
import { AuthService } from '../../auth/auth.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { Router } from '@angular/router';
import { LoginModel } from '../../auth/login.model';

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

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  constructor(
    private authService : AuthService,
    private bnIdle : BnNgIdleService,
    private router: Router
  ){
    this.bnIdle.startWatching(30).subscribe((res) => {
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
}
