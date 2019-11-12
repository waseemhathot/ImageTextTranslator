import { TestBed } from '@angular/core/testing';

import { CanvasBuildingService } from './canvas-building.service';

describe('CanvasBuildingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanvasBuildingService = TestBed.get(CanvasBuildingService);
    expect(service).toBeTruthy();
  });
});
