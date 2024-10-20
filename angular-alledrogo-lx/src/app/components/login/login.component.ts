import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {Router, RouterLink, RouterModule } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { LoginResponseBody, User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import {NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink,
    RouterModule
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
  cognitoLoginUrl: string = environment.cognitoLoginUrl;

  constructor(
    private router: Router,
    private loginService: LoginService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    // Redirect to Cognito login page
    window.location.href = this.cognitoLoginUrl;
  }


  signIn(): void {
    this.loading = true;
    this.errorMessage = '';
    
    


    // this.loginService.login({ email: this.user.email, password: this.user.password })
    //   .subscribe((response: HttpResponse<LoginResponseBody>) => {
    //     const responseBody = response.body as LoginResponseBody;
    //     console.log('Response Body:', responseBody);
    //     localStorage.setItem('accessToken', responseBody.accessToken); // Store the token
    //     this.router.navigate(['/home']);
    //     this.loading = false;
    //     this.authService.isLoggedIn = true;
    //   }, (error: HttpErrorResponse) => {
    //     console.error('Login failed', error);
    //     this.errorMessage = 'Login failed. Please check your credentials and try again.';
    //     this.loading = false;
    //   });
  }

  togglePasswordVisibility(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.showPasswordIcon = !this.showPasswordIcon;
  }
}
