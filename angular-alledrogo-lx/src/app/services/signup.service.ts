import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {Observable} from "rxjs";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private signupUrl = `${environment.backendUrl}/api/User/register`;
  constructor(private http: HttpClient) {}

  signUp(user: { email: string; password: string; phoneNumber?: string }): Observable<any> {
    return this.http.post<any>(this.signupUrl, user);
  }
}
