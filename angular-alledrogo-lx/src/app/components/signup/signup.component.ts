import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
// @ts-ignore
import zxcvbn from 'zxcvbn';
import {User} from '../../models/user';
import {SignupService} from "../../services/signup.service";
import { environment } from '../../../environments/environment';

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
  user: User = { email: '', password: '', phoneNumber: '' };
  showPassword!: false;

  passwordType: string = 'password';
  showPasswordIcon: boolean = false;
  cognitoLoginUrl: string = environment.cognitoLoginUrl;
  constructor(
    private router: Router,
    private signupService: SignupService
  ) {
  }

  ngOnInit(): void {
    // Redirect to Cognito login page
    window.location.href = this.cognitoLoginUrl;
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
    // Return true if all requirements are met, false otherwise
    return (
      hasValidLength && hasCapitalLetter && hasSpecialSymbol && hasNumber
    );
  }

  isNineDigitPhoneNumberValid(phoneNumber: string): boolean {
    const nineDigitPhoneNumberRegex = /^\d{9}$/;
    return nineDigitPhoneNumberRegex.test(phoneNumber);
  }


  public signUp(): void {
    console.log(this.user);
    // Explicitly casting phoneNumber to a string
    const user = {
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value,
      phoneNumber: String(this.registerForm.controls['phoneNumber']?.value)
    };
    this.signupService.signUp(user).subscribe(
      response => {
        console.log('User signed up successfully');
        this.router.navigate(['/home']); // Navigate to home or another route upon successful sign-up
      },
      error => {
        console.error('Error signing up:', error);
        this.errorMessage = 'There was an error signing up. Please try again.';
      }
    );
  }
}
