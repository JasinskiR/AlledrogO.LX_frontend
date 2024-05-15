import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private signupUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  signUp(user: User): Observable<any> {
    return this.http.post<any>(this.signupUrl, user);
  }
}
