

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL = `${environment.baseUrl}/api`;
  constructor(private http: HttpClient) { }

  IsLoggedIn() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    else if (this.isTokenExpired(token)) {
      return false
    }
    return true;
  }

  getToken() {
    return window.localStorage.getItem("token")
  }

  isTokenExpired(token?: string) {
    if (!token) {
      return true;
    }
    const date = this.getTokenExpirationDate(token);
    if (date === null) {
      return true;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  getTokenExpirationDate(token: string) {
    const decoded: any = jwt_decode(token);
    const date = new Date(0);
    if (decoded.exp === undefined) {
      return null;
    }
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  login(username: string, password: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    }
    return this.http.post<string>(`${this.URL}/Login`, { username, password }, requestOptions);
  }



}

