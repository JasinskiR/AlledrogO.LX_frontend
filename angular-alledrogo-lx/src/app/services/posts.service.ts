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

  createPost(post: { title: string; description: string}): Observable<any> {
    return this.http.post<any>(postUrl, post);
  }

  editPost(postId: string, post: { title: string; description: string}): Observable<any> {
    return this.http.put<any>(`${postUrl}/${postId}`, post);
  }

  uploadPhoto(postId: string, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', photo, photo.name);
    return this.http.put(`${postUrl}/${postId}/Image`, formData, {responseType: 'text'});
  }

  deletePhoto(postId: string, imageId: string): Observable<any> {
    return this.http.delete<any>(`${postUrl}/${postId}/Image/${imageId}`);
  }

  publishPost(postId: string): Observable<any> {
    return this.http.patch<any>(`${postUrl}/${postId}/Publish`, {});
  }

  archivePost(postId: string): Observable<any> {
    return this.http.patch<any>(`${postUrl}/${postId}/Archive`, {});
  }

  addTagForPost(postId: string, tagName:string): Observable<any> {
    return this.http.put(`${postUrl}/${postId}/Tag/${tagName}`, {});
  }

  deleteTagForPost(postId: string, tagName:string): Observable<any> {
    return this.http.delete<any>(`${postUrl}/${postId}/Tag/${tagName}`);
  }

}
