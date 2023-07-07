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

  viewPosts(username: any) {
    let url = this.apiUrl + `post/${username}/viewPosts`;
    return this.http.get<any>(url);
  }

  updatePost(filter:any,id: any) {
    let url = this.apiUrl + `post/${id}/updatePost`;
    return this.http.put<any>(url,filter);
  }

  deletePost(id: any) {
    let url = this.apiUrl + `post/${id}/deletePost`;
    return this.http.delete<any>(url);
  }

  deleteImage(postId: any, filter: any) {
    let url = this.apiUrl + `post/${postId}/deleteImage`;
    return this.http.put<any>(url,filter);
  }
}
