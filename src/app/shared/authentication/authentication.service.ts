import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URLs } from '../constant/routes-config';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string) {
    const options = {
      email: username,
      password
    }

    return this.http.post(API_URLs.Login.authenticate, options).map((response: { token: string }) => {
      localStorage.setItem('token', JSON.stringify(response.token));
    })
  }

  logout() {
    localStorage.removeItem('token');
  }

  isUserAuthenticated() {
    return localStorage.getItem('token');
  }
}
