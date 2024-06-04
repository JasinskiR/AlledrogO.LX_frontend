import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginCredentials, LoginResponseBody } from '../models/user';

const loginUrl = 'http://localhost:5000/api/User/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  login(credentials: LoginCredentials): Observable<HttpResponse<LoginResponseBody>> {
    return this.http.post<LoginResponseBody>(loginUrl, credentials, {
      observe: 'response', // To get full response including headers
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
