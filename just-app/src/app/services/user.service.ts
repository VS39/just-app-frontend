import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) {}

  checkExistingUser(filter: any) {
    let url = this.apiUrl + 'user/checkExistingUser';
    return this.http.post<any>(url, filter);
  }

  resetPassword(filter: any) {
    let url = this.apiUrl + 'user/resetPassword';
    return this.http.post<any>(url, filter);
  }

  viewUser(username: any) {
    let url = this.apiUrl + 'user/' + username + '/viewUser';
    return this.http.get<any>(url);
  }

  getUserPic(username: any) {
    let url = this.apiUrl + 'user/' + username + '/getUserPic';
    return this.http.get<any>(url);
  }

  getUserDetails(filter: any) {
    let url = this.apiUrl + 'user/getUserDetails';
    return this.http.put<any>(url,filter);
  }

  updateUser(filter: any, id: any) {
    let url = this.apiUrl + `user/${id}/updateUser`;
    return this.http.put<any>(url, filter);
  }

  updateUserImage(profilePic: any, id: any, imageType: any) {
    const postData = new FormData();
    postData.append('profilePic', profilePic);
    postData.append('imageType', imageType);
    let url = this.apiUrl + `user/${id}/updateUser`;
    return this.http.put<any>(url, postData);
  }

  follow(filter: any, id: any) {
    let url = this.apiUrl + 'user/' + id + '/followUser';
    return this.http.post<any>(url, filter);
  }

  unfollow(filter: any, id: any) {
    let url = this.apiUrl + 'user/' + id + '/unfollowUser';
    return this.http.post<any>(url, filter);
  }

  getfollowList(id: any) {
    let url = this.apiUrl + 'user/' + id + '/getfollowList';
    return this.http.get<any>(url);
  }
}
