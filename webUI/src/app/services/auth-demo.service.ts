import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthDemoService {

  constructor(private http: HttpClient) { }

  // replace this the actual implementation of the login method
  login() {
    return this.http.get('/api/auth/login');
  }

  // replace this the actual implementation of the logout method
  logout() {
    return this.http.get('/api/auth/logout');
  }

  // replace this the actual implementation of the requestRefresh
  requestRefreshToken() {
    return this.http.get('/api/auth/refresh');
  }
}
