import { TestBed } from '@angular/core/testing';

import { LoadingAnimServiceService } from './loading-anim-service.service';

describe('LoadingAnimServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadingAnimServiceService = TestBed.get(LoadingAnimServiceService);
    expect(service).toBeTruthy();
  });
});
