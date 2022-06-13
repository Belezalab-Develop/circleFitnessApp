import { TestBed } from '@angular/core/testing';

import { ApiInfluencersService } from './api-influencers.service';

describe('ApiInfluencersService', () => {
  let service: ApiInfluencersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiInfluencersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
