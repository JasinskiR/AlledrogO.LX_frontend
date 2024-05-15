import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {LoginCredentials, LoginResponse, User} from '../models/user';

const loginUrl = 'http://localhost:3000/users';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly http: HttpClient) { }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(loginUrl, credentials);
  }

  checkUserExists(email: string, password: string): Observable<User | undefined> {
    // Construct the URL with the email and password as query parameters
    const url = `${loginUrl}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    return this.http.get<User[]>(url).pipe(
      map(users => users.find(user => user.email === email && user.password === password))
    );
  }
}
