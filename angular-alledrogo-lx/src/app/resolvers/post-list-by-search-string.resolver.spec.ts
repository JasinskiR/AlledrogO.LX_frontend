import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { postListBySearchStringResolver } from './post-list-by-search-string.resolver';
import { Post } from '../models/post';

describe('postListBySearchStringResolver', () => {
  const executeResolver: ResolveFn<Post[]> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => postListBySearchStringResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
