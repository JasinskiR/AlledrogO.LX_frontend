import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { postDetailsResolver } from './post-details.resolver';
import { Post } from '../models/post';

describe('postDetailsResolver', () => {
  const executeResolver: ResolveFn<Post> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => postDetailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
