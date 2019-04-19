import { TestBed } from '@angular/core/testing';

import { GlobalUrlSerializerService } from './global-url-serializer.service';

describe('GlobalUrlSerializerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalUrlSerializerService = TestBed.get(GlobalUrlSerializerService);
    expect(service).toBeTruthy();
  });
});
