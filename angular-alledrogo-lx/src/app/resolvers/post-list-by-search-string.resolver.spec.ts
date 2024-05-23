import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { postListBySearchStringResolver } from './post-list-by-search-string.resolver';

describe('postListBySearchStringResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => postListBySearchStringResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
