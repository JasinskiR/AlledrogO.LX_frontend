import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginCredentials, LoginResponseBody } from '../models/user';
import { environment } from '../../environments/environment';

const loginUrl = `${environment.backendUrl}/api/User/login`;

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
