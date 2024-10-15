import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-redirect',
  template: '<p>Redirecting...</p>'
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
        this.router.navigate(['/home']);

      } else {
        console.error('Access token not found in URL fragment');
      }
    });
  }
}