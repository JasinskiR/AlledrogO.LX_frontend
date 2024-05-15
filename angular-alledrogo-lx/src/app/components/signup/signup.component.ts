import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
// @ts-ignore
import zxcvbn from 'zxcvbn';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  @ViewChild('f') registerForm!: NgForm;
  errorMessage: string = "";
  user = {
    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    showPassword: false
  };
  passwordType: string = 'password';
  showPasswordIcon: boolean = false;

  constructor(
    private router: Router,
  ) {
  }

  password: string = 'a';

  togglePasswordVisibility(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';

    this.showPasswordIcon = !this.showPasswordIcon;
  }

  getPasswordStrength(password: string): string {
    if (password == null) password = 'a';
    const result = zxcvbn(password);

    switch (result.score) {
      case 0:
        return 'Very weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Strong';
      case 4:
        return 'Very strong';
      default:
        return '';
    }
  }

  checkPasswordValidity(password: string): boolean {
    // Define the regular expressions for each requirement
    const lengthRegex = /.{8,}/;
    const capitalLetterRegex = /[A-Z]/;
    const specialSymbolRegex = /[@#$%^&*]/;
    const numberRegex = /[0-9]/;

    // Check each requirement
    const hasValidLength = lengthRegex.test(password);
    const hasCapitalLetter = capitalLetterRegex.test(password);
    const hasSpecialSymbol = specialSymbolRegex.test(password);
    const hasNumber = numberRegex.test(password);
    console.log(hasValidLength && hasCapitalLetter && hasSpecialSymbol && hasNumber);
    // Return true if all requirements are met, false otherwise
    return (
      hasValidLength && hasCapitalLetter && hasSpecialSymbol && hasNumber
    );
  }

  public signUp(): void {
    console.log(this.user);
  }
}