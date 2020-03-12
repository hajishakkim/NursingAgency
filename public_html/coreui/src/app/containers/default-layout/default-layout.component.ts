import {Component } from '@angular/core';
import { navItems } from '../../_nav';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  constructor(
    private authService : AuthService
  ){
  }

  onLogout()
  {
    this.authService.logout();
  }

  onLockScreen()
  {

  }
}
