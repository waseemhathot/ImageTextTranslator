import { TestBed } from '@angular/core/testing';

import { TextDetectionService } from './text-detection.service';

describe('TextDetectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TextDetectionService = TestBed.get(TextDetectionService);
    expect(service).toBeTruthy();
  });
});
