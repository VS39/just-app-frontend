import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) {}

  signUp(filter: any) {
    let url = this.apiUrl + 'user/signUp';
    return this.http.post<any>(url, filter);
  }
}
