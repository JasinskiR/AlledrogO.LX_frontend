import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Post } from '../../models/post';
import { PostInGeneralComponent } from '../post-in-general/post-in-general.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-users-posts',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    PostInGeneralComponent,
    RouterLink
  ],
  templateUrl: './users-posts.component.html',
  styleUrls: ['./users-posts.component.scss']
})
export class UsersPostsComponent {
  draftPosts: Post[] = [];
  publishedPosts: Post[] = [];
  archivedPosts: Post[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/home']);
    }
    this.activatedRoute.data.subscribe(data => {
      const allPosts: Post[] = data['posts'];
      this.draftPosts = allPosts.filter(post => post.status === 0);
      this.publishedPosts = allPosts.filter(post => post.status === 1);
      this.archivedPosts = allPosts.filter(post => post.status === 2);
    });
  }
}
