import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserCreds } from '../models/request/UserCreds';
import { HttpClient } from '@angular/common/http';
import { UserRegister } from '../models/request/UserRegister';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private apiBaseUrlAuth = environment.BASE_URL + environment.AUTH;
  private loginUrl = this.apiBaseUrlAuth + environment.LOGIN;
  private registerUrl = this.apiBaseUrlAuth + environment.REGISTER;

  loginAuthentication(user: UserCreds) {
    return this.http.post(
      this.loginUrl,
      {
        email: user.email,
        password: user.login_password,
      },
      {
        responseType: 'json',
      }
    );
  }

  userRegistration(userDetails: UserRegister) {
    return this.http.post(
      this.registerUrl,
      {
        email: userDetails.email,
        password: userDetails.password,
        name: userDetails.name,
        gender: userDetails.gender,
        phoneNumber: userDetails.phoneNumber,
      },
      {
        responseType: 'json',
      }
    );
  }

  isUserLoggedIn(): boolean {
    return sessionStorage.getItem('bearer_token') ? true : false;
  }

  logout() {
    sessionStorage.clear();
    
  }
}
