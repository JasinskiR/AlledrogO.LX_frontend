import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {LoginCredentials, LoginResponse, User} from '../models/user';

const loginUrl = 'http://localhost:5000/api/User/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly http: HttpClient) { }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(loginUrl, credentials);
  }
}
