import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {  BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


import { RegisterModel } from './register.model';
import { LoginModel } from './login.model';
import { UserModel } from './user.model';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';


export interface AuthResponseData {
  data : {
    token     : string;
    userName  : string
    userId    : number;
    email     : string;
  },
  success : boolean
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  baseUrl = environment.baseUrl;
  user    = new BehaviorSubject<UserModel>(null);

  constructor(private http : HttpClient, private router: Router) { }

  onRegister(data : RegisterModel)
  {
    return this.http.post<AuthResponseData>(this.baseUrl + '/register',data)
    .pipe(
      catchError(this.handleError),
      tap((resData : any) => {
        this.handleAuthentication(
          resData.email,
          resData.userName,
          resData.userId,
          resData.token,
        );
      })
    );
  }

  onlogin(data : LoginModel)
  {
    return this.http.post<AuthResponseData>(this.baseUrl + '/apis/modules/login.php',data)
    .pipe(
      catchError(this.handleError),
      tap((resData : any) => {
        this.handleAuthentication(
          resData.email,
          resData.userName,
          resData.userId,
          resData.token,
        );
      })
    );
  }

  handleError(errorRes: HttpErrorResponse)
  {
    let errorMessage = 'An unknown error occurred!';

    if (!errorRes.error || !errorRes.error.data) {
      return throwError(errorMessage);
    }
    
    switch (errorRes.error.data.error) {
      case 'Unauthorised':
          errorMessage = 'Email or Password is incorrect';
      default :
        errorMessage = 'An unknown error occurred! 11';
    }

    return throwError(errorMessage);
  }

  handleAuthentication(email,userName,userId,token)
  {
    const user = new UserModel(email, userName ,userId, token);
    localStorage.setItem('userData', JSON.stringify(user));
    this.user.next(user);
  }

  autoLogin() {
    const userData: {
      email   : string;
      userId  : number;
      userName: string;
      _token   : string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new UserModel(
      userData.email,
      userData.userId,
      userData.userName,
      userData._token
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
  }
}
