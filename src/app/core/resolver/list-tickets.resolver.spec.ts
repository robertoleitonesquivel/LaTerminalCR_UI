import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { listTicketsResolver } from './list-tickets.resolver';

describe('listTicketsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => listTicketsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
