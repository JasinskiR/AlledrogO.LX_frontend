import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostInGeneralComponent } from '../post-in-general/post-in-general.component';
import { Post } from '../../models/post';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    PostInGeneralComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})

export class HomepageComponent {
  readonly posts: Post[];

  constructor(private readonly activatedRoute: ActivatedRoute) {
    this.posts = this.activatedRoute.snapshot.data['posts']
  }
}
