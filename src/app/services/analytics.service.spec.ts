import { TestBed } from '@angular/core/testing';

import { Analytics~Service } from './analytics~.service';

describe('Analytics~Service', () => {
  let service: Analytics~Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Analytics~Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
