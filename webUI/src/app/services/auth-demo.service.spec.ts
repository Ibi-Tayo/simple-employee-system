import { TestBed } from '@angular/core/testing';

import { AuthDemoService } from './auth-demo.service';

describe('AuthDemoService', () => {
  let service: AuthDemoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthDemoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
