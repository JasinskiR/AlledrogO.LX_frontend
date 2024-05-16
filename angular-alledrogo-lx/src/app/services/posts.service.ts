import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const postUrl = 'http://localhost:3000/posts';
// const postUrl = 'http://localhost:5000/api/Post';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private readonly http: HttpClient){ }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(postUrl);
  }
}
