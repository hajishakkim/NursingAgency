import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../auth/login.model';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls : ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private agency        :string;
  private userIdentity  :string;
  private password      :string;

  constructor(
    private authService : AuthService,
    private router      : Router
  ) { }

  ngOnInit() {
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

}
