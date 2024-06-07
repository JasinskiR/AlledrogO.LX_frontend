import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { usersPostsListResolver } from './users-posts-list.resolver';

describe('usersPostsListResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => usersPostsListResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
