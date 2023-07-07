import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userToken: any;
  tokenTimer: any;
  apiUrl = 'http://localhost:5000/api/';
  private isUserloggedIn: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  isAuth: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    let userToken = localStorage.getItem('userToken');
    return userToken;
  }

  getisAuth() {
    let user = localStorage.getItem('userToken');
    if (user != null && user != '') {
      return true;
    }
    return false;
  }

  signUp(filter: any) {
    let url = this.apiUrl + 'user/signUp';
    return this.http.post<any>(url, filter);
  }

  logIn(username: any, password: any) {
    let filter = {
      username: username,
      password: password,
    };
    let url = this.apiUrl + 'user/logIn';
    return this.http.post<any>(url, filter, httpOptions).pipe(
      map((data: any) => {
        if (data != null) {
          if (data.Success) {
          //  this.tokenTimer = setTimeout(()=>{
          //     this.logOut();
          //   }, data.Data.expiresIn);
            this.userToken = data.Data.token;
            localStorage.setItem('userId', data.Data.id);
            localStorage.setItem('userToken', data.Data.token);
            localStorage.setItem('userName', data.Data.username);
            this.isUserloggedIn.next(true);
            this.isAuth = true;
          }
        }

        return data;
      })
    );

    // let url = this.apiUrl + 'user/logIn';
    // return this.http.post<any>(url, filter);
  }

  logOut() {
    this.userToken = null;
    this.isAuth = false;
    this.isUserloggedIn.next(false);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
    // clearTimeout(this.tokenTimer);
  }
}
