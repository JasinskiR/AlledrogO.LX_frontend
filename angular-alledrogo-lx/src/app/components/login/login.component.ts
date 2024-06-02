import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf } from "@angular/common";
import { Router } from '@angular/router';
import { LoginResponse, User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  user: User = { email: '', password: '', phoneNumber: '' };
  errorMessage: string | null = null;
  loading: boolean = false;
  passwordType: string = 'password';
  showPasswordIcon: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  signIn(): void {
    this.loading = true;
    this.errorMessage = '';
    const url = 'http://localhost:5000/api/User/login';
    const body = JSON.stringify(this.user);

    this.http.post(url, body, {
      observe: 'response', // To get full response including headers
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).subscribe((response) => {
      if (response.headers.has('Set-Cookie')) {
        const rawCookie = response.headers.get('Set-Cookie');
        console.log('Cookie: ', rawCookie);
        if (rawCookie!== null) {
          const sessionTokenMatch = rawCookie.match(/\.AspNetCore\.Identity\.Application=([^;]+)/);
          console.log('SessionToken: ', sessionTokenMatch);
          if (sessionTokenMatch && sessionTokenMatch[1]) {
            document.cookie = `.AspNetCore.Identity.Application=${sessionTokenMatch[1]}; path=/`;
          }
        }
      }
      console.log('Response Body:', response.body);
      this.router.navigate(['/home']);
    }, (error: HttpErrorResponse) => {
      console.error('Login failed', error);
      this.errorMessage = 'Login failed. Please check your credentials and try again.';
      this.loading = false;
    });
  }


  togglePasswordVisibility(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.showPasswordIcon = !this.showPasswordIcon;
  }
}
