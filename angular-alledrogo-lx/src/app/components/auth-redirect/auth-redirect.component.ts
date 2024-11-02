import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-redirect',
  standalone: true,
  template: '<p>Redirecting...</p>',
  imports: [
    RouterLink,
    RouterModule
  ]
})
export class AuthRedirectComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

    ngOnInit(): void {
        this.route.fragment.subscribe(fragment => {
        const params = new URLSearchParams(fragment || '');
        const accessToken = params.get('access_token');
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            console.log('Access token found in URL fragment');
            this.authService.isLoggedIn = true;
            console.log("Logged in: " + this.authService.isLoggedIn);
            console.log("Redirecting to home page");
            this.routeToHome();
        }});
    }
    routeToHome(): void {
        this.router.navigate(['/home']);
    }
}