import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  apiUrl = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) {}

  addPost(data: any) {
    let url = this.apiUrl + 'post/addPost';
    return this.http.post<any>(url, data);
  }
}
