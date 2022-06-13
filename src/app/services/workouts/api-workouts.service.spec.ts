import { TestBed } from '@angular/core/testing';

import { ApiWorkoutsService } from './api-workouts.service';

describe('ApiWorkoutsService', () => {
  let service: ApiWorkoutsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiWorkoutsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
