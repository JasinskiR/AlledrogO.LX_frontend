import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

// const postUrl = 'http://localhost:3000/posts';
const postUrl = 'http://localhost:5000/api/Post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient){ }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(postUrl);
  }

  getPostById(postId: string): Observable<Post> {
    return this.http.get<Post>(`${postUrl}/${postId}`);
  }

  getPostsBySearchString(body: any): Observable<Post[]> {
    const body_obj = JSON.parse(body);
    return this.http.post<Post[]>(`${postUrl}/search`, body_obj);
  }
}
