import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  cognitoLoginUrl = environment.cognitoLoginUrl;
  backendUrl = environment.backendUrl;
  constructor(public authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
  logout(): void {
    this.authService.logout();
  }
}
