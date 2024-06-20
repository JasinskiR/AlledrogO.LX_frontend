import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { usersPostsListResolver } from './users-posts-list.resolver';
import { Post } from '../models/post';

describe('usersPostsListResolver', () => {
  const executeResolver: ResolveFn<Post[]> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => usersPostsListResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
