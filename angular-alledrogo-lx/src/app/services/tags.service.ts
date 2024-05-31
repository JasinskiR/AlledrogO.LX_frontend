import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag';

const tagUrl = 'http://localhost:5000/api/Tag';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  
  constructor(private readonly http: HttpClient) {}

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(tagUrl)
  }
}
