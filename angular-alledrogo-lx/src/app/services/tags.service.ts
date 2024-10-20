import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag';
import { environment } from '../../environments/environment';

const tagUrl = `${environment.backendUrl}/api/Tag`;

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) {}

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(tagUrl)
  }
}
