import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../auth/login.model';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { UserModel } from '../../auth/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './screen-lock.component.html',
  styleUrls : ['./screen-lock.component.css']
})
export class ScreenLockComponent implements OnInit {
  private agency        :string;
  private userIdentity  :string;
  private password      :string;
  private loadedUser    :UserModel;
  constructor(
    private authService : AuthService,
    private router      : Router
  ) {
    this.authService.user.subscribe(
      (res : any) => {
        this.loadedUser = new UserModel(
          res.email,
          res.userId,
          res.userName,
          '',
          res.angency
        );

        this.authService.user.next(this.loadedUser);
        
        this.agency       = res.agency;
        this.userIdentity = res.userName;
      }
    )
   }

  ngOnInit() {
    this.authService.logout();
  }

  onLogin()
  {
    const data = new LoginModel(this.agency,this.userIdentity,this.password);
    this.authService.onlogin(data).subscribe(
      resDate => {
        this.router.navigate(['vacancies']);
      }
    )

  }

  onLogout()
  {
    this.authService.logout();
  }

}
