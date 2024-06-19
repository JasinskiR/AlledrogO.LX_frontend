import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { chatListResolver } from './chat-list.resolver';

describe('chatListResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => chatListResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
