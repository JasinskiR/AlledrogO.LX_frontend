import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const authorUrl = 'http://localhost:5000/api/Author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient){ }

  getAllUsersPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${authorUrl}/posts`);
  }

  getAuthorId():Observable<any> {
    return this.http.get<Post[]>(`${authorUrl}/info`);
  }
}
