import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from './model/user';
import { AuthResponse } from './model/auth-response';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public login(userInfo: Object) {
    return this.http.post<AuthResponse>(environment.baseUrl + "/api/auth", userInfo);
  }

  public rememberUser(response: AuthResponse) {
    localStorage.setItem('ACCESS_TOKEN', response.token);
    localStorage.setItem('CURRENT_USER', JSON.stringify(response.user));
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('CURRENT_USER'));
  }

  public isAdmin(): boolean {
    return this.getCurrentUser().admin;
  }

  public logout() {
    localStorage.removeItem('CURRENT_USER');
    localStorage.removeItem('ACCESS_TOKEN');
  }
}