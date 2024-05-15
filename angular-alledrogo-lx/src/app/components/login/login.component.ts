import {Component} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {NgIf} from "@angular/common";
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user = { email: '', password: '' };
  errorMessage: string | null = null;
  loading: boolean = false;
  passwordType: string = 'password';
  showPasswordIcon: boolean = false;

  constructor(
    private router: Router,
  ) {
  }

  // ngOnInit(): {
  //   this.user
  // }
  signIn(): void {
    this.loading = true;
    this.errorMessage = '';
    this.router.navigate(['/home']);
  }

  togglePasswordVisibility(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';

    this.showPasswordIcon = !this.showPasswordIcon;
  }

}
