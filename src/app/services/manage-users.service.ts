import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../user-module/user-details/User';

@Injectable({
  providedIn: 'root',
})
export class ManageUsersService {
  constructor(private http: HttpClient) {}

  private apiBaseUrl = environment.BASE_URL + environment.USER;
  private apiUrlToGetUserDetails = this.apiBaseUrl + environment.GET_ALL_USERS;
  private updateUserDetailsApiUrl =
    this.apiBaseUrl + environment.UPDATE_USER_DETAILS;
  private deleteUserDetailsApiUrl = this.apiBaseUrl + environment.DELETE_USER;
  private deleteMultipleUsersApiUrl =
    this.apiBaseUrl + environment.DELETE_MULTIPLE_USERS;

  getUserDetails() {
    return this.http.get(this.apiUrlToGetUserDetails, {
      responseType: 'json',
    });
  }

  updateUser(id: number, updatedUser: Partial<User>): Observable<any> {
    return this.http.put(`${this.updateUserDetailsApiUrl}/${id}`, updatedUser);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.deleteUserDetailsApiUrl}/${id}`);
  }

  deleteMultipleUsers(userIds: number[]): Observable<any> {
    return this.http.post(this.deleteMultipleUsersApiUrl, userIds);
  }
}
