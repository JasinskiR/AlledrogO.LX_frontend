import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { postListResolver } from './post-list.resolver';
import { Post } from '../models/post';

describe('postListResolver', () => {
  const executeResolver: ResolveFn<Post[]> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => postListResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
