import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    loginPageUrl: string = environment.cognitoLoginUrl
    logoutPageUrl: string = environment.cognitoLogoutUrl
    isLoggedIn: boolean = false;

    logout(): void {
        localStorage.removeItem('accessToken');
        this.isLoggedIn = false;
        window.location.href = this.logoutPageUrl;
    }

    login(): void {
        window.location.href = this.loginPageUrl;
    }
}
