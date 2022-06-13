import { TestBed } from '@angular/core/testing';

import { ApiNutritionService } from './api-nutrition.service';

describe('ApiNutritionService', () => {
  let service: ApiNutritionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiNutritionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
