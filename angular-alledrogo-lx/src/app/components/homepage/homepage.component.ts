import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostInGeneralComponent } from '../post-in-general/post-in-general.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { Post } from '../../models/post';
import { ActivatedRoute, Params  } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    PostInGeneralComponent,
    SearchbarComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})

export class HomepageComponent {
  posts: Post[] = [];
  tags: string[] = [];
  searchString: string = '';

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.posts = data['posts'];
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      const body = params['body'];
      if (body) {
        const query = JSON.parse(params['body']);
        this.searchString = query.search.queryString;
        this.tags = query.search.tags;
        this.fetchPostsBySearch();
      } else {
        this.fetchAllPosts();
      }
    });
  }

  fetchPostsBySearch() {
    this.activatedRoute.data.subscribe(data => {
      this.posts = data['searchedPosts'];
    });
  }

  fetchAllPosts() {
    this.activatedRoute.data.subscribe(data => {
      this.posts = data['posts'];
    });
  }

}
