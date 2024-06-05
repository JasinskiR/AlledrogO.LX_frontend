import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  logout(): void {
    localStorage.removeItem('accessToken');
    this.isLoggedIn = false;
  }
}
