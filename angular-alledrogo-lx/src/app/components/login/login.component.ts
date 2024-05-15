import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf } from "@angular/common";
import { Router } from '@angular/router';
import { LoginResponse, User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  user: User = { id: '', name: '', surname: '', username: '', email: '', password: '', phoneNumber: '' };
  errorMessage: string | null = null;
  loading: boolean = false;
  passwordType: string = 'password';
  showPasswordIcon: boolean = false;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  signIn(): void {
    this.loading = true;
    this.errorMessage = '';
    this.loginService.checkUserExists(this.user.email, this.user.password).subscribe(
      user => {
        if (user) {
          console.log('User exists');
          // Handle successful check
        } else {
          console.log('User does not exist');
          // Handle unsuccessful check
        }
      },
      error => {
        console.error('Error checking user:', error);
        // Handle error
      }
    );

    // this.loginService.login(this.user).subscribe(
    //   (response: LoginResponse) => {
    //     console.log('Login successful', response);
    //     // Store the token and user details
    //     localStorage.setItem('token', response.token);
    //     localStorage.setItem('user', JSON.stringify(response.user));
    //     // Navigate to home on successful login
    //     this.router.navigate(['/home']);
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.error('Login failed', error);
    //     this.errorMessage = 'Login failed. Please check your credentials and try again.';
    //     this.loading = false;
    //   }
    // );
  }

  togglePasswordVisibility(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.showPasswordIcon = !this.showPasswordIcon;
  }
}
